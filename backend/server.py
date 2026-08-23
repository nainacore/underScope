"""UnderScope backend – demo financial research platform.
Provides seeded demo data endpoints and a Claude Sonnet 5 research assistant.
"""
import json
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

from seed import (
    COMPANIES, MARKET_INDICES, MARKET_SIGNALS, TRENDING_TICKERS,
    INVESTIGATIONS, TIMELINE, NEWS, CURRENCY_BY_COUNTRY,
    price_history, financials, dependency_map,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

app = FastAPI(title="UnderScope API")
api_router = APIRouter(prefix="/api")


# ------------------------- Utility -------------------------

def _company_summary(c: dict) -> dict:
    return {
        "ticker": c["ticker"], "name": c["name"], "exchange": c["exchange"],
        "country": c["country"], "sector": c["sector"], "industry": c["industry"],
        "price": c["price"], "change_pct": c["change_pct"], "change_abs": c["change_abs"],
        "market_cap_b": c["market_cap_b"], "pe": c["pe"],
        "revenue_growth_pct": c["revenue_growth_pct"], "eps_ttm": c["eps_ttm"],
        "logo_bg": c["logo_bg"], "currency": CURRENCY_BY_COUNTRY.get(c["country"], "$"),
        "recent_event": c["recent_event"],
    }


def _company_full(c: dict) -> dict:
    d = _company_summary(c)
    d.update({
        "snapshot": c["snapshot"], "hq": c["hq"], "employees": c["employees"],
        "founded": c["founded"],
        "last_updated": datetime.now(timezone.utc).isoformat(),
    })
    return d


# ------------------------- Endpoints -------------------------

@api_router.get("/")
async def root():
    return {"service": "UnderScope API", "status": "ok", "demo": True}


@api_router.get("/companies")
async def list_companies(q: Optional[str] = None, sector: Optional[str] = None, country: Optional[str] = None):
    results = COMPANIES
    if q:
        ql = q.lower().strip()
        results = [c for c in results if ql in c["name"].lower() or ql in c["ticker"].lower() or ql in c["sector"].lower() or ql in c["industry"].lower()]
    if sector:
        results = [c for c in results if c["sector"].lower() == sector.lower()]
    if country:
        results = [c for c in results if c["country"].lower() == country.lower()]
    return {"items": [_company_summary(c) for c in results], "count": len(results), "demo": True}


@api_router.get("/companies/{ticker}")
async def get_company(ticker: str):
    c = next((c for c in COMPANIES if c["ticker"].lower() == ticker.lower()), None)
    if not c:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"company": _company_full(c), "demo": True}


@api_router.get("/companies/{ticker}/price-history")
async def get_price_history(ticker: str):
    ph = price_history(ticker.upper())
    if not ph:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"ticker": ticker.upper(), "series": ph, "demo": True}


@api_router.get("/companies/{ticker}/financials")
async def get_financials(ticker: str):
    f = financials(ticker.upper())
    if not f:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"ticker": ticker.upper(), "financials": f, "demo": True}


@api_router.get("/companies/{ticker}/investigations")
async def get_investigations(ticker: str):
    cards = INVESTIGATIONS.get(ticker.upper(), [])
    # If no seeded investigations, produce a light heuristic template so the tab is never empty
    if not cards:
        c = next((c for c in COMPANIES if c["ticker"].lower() == ticker.lower()), None)
        if not c:
            raise HTTPException(status_code=404, detail="Company not found")
        cards = [{
            "category": "General Overview",
            "type": "ai_interpretation",
            "confidence": 55,
            "finding": f"{c['name']} operates in {c['industry']}; primary risks stem from {c['sector']} cycle dynamics.",
            "why": "Baseline framing while deeper investigation cards are being generated for this company.",
            "evidence": "Company profile and industry classification.",
            "metrics": [
                {"label": "Sector", "value": c["sector"]},
                {"label": "Rev growth", "value": f"{c['revenue_growth_pct']}%"},
            ],
            "sources": ["Company profile (demo)"]
        }]
    return {"ticker": ticker.upper(), "items": cards, "demo": True}


@api_router.get("/companies/{ticker}/news")
async def get_news(ticker: str):
    t = ticker.upper()
    if not any(c["ticker"] == t for c in COMPANIES):
        raise HTTPException(status_code=404, detail="Company not found")
    return {"ticker": t, "items": NEWS.get(t, []), "demo": True}


@api_router.get("/companies/{ticker}/events")
async def get_events(ticker: str):
    t = ticker.upper()
    if not any(c["ticker"] == t for c in COMPANIES):
        raise HTTPException(status_code=404, detail="Company not found")
    return {"ticker": t, "items": TIMELINE.get(t, []), "demo": True}


@api_router.get("/companies/{ticker}/dependencies")
async def get_dependencies(ticker: str):
    t = ticker.upper()
    if not any(c["ticker"] == t for c in COMPANIES):
        raise HTTPException(status_code=404, detail="Company not found")
    return {"ticker": t, "dependency_map": dependency_map(t), "demo": True}


@api_router.get("/market/overview")
async def market_overview():
    return {"indices": MARKET_INDICES, "signals": MARKET_SIGNALS, "trending": TRENDING_TICKERS, "demo": True}


@api_router.get("/market/trending")
async def market_trending():
    tickers = TRENDING_TICKERS
    items = [_company_summary(c) for c in COMPANIES if c["ticker"] in tickers]
    # keep order
    items.sort(key=lambda c: tickers.index(c["ticker"]))
    return {"items": items, "demo": True}


@api_router.get("/market/signals")
async def market_signals():
    return {"items": MARKET_SIGNALS, "demo": True}


class CompareRequest(BaseModel):
    tickers: List[str]


@api_router.post("/compare")
async def compare(payload: CompareRequest):
    tickers = [t.upper() for t in payload.tickers]
    if len(tickers) < 2 or len(tickers) > 4:
        raise HTTPException(status_code=400, detail="Compare 2–4 companies")
    items = []
    for t in tickers:
        c = next((c for c in COMPANIES if c["ticker"] == t), None)
        if not c:
            raise HTTPException(status_code=404, detail=f"Company {t} not found")
        items.append({**_company_full(c), "financials": financials(t)})
    return {"items": items, "demo": True}


# ------------------------- AI Research Assistant -------------------------

class AskRequest(BaseModel):
    ticker: Optional[str] = None
    question: str
    session_id: Optional[str] = None


def _company_context(ticker: str) -> str:
    if not ticker:
        return ""
    c = next((c for c in COMPANIES if c["ticker"].upper() == ticker.upper()), None)
    if not c:
        return ""
    inv = INVESTIGATIONS.get(ticker.upper(), [])
    fin = financials(ticker.upper())
    dep = dependency_map(ticker.upper())
    inv_text = "\n".join([f"- [{i['type']}] {i['category']}: {i['finding']}" for i in inv])
    dep_text = ", ".join([n["label"] if isinstance(n, dict) else n for n in dep.get("nodes", [])])
    return (
        f"COMPANY: {c['name']} ({c['ticker']}, {c['exchange']})\n"
        f"Sector: {c['sector']} / {c['industry']}\n"
        f"Snapshot: {c['snapshot']}\n"
        f"Latest event: {c['recent_event']}\n"
        f"Price: {c['price']} ({c['change_pct']}% today); Market cap ~${c['market_cap_b']}B; P/E {c['pe']}; Rev growth {c['revenue_growth_pct']}%\n"
        f"Existing investigation findings:\n{inv_text}\n"
        f"Key dependencies: {dep_text}\n"
        f"Latest annual revenue (demo): {fin['income_statement']['revenue'][-1]}B (currency {fin['currency']})\n"
    )


SYSTEM_PROMPT = (
    "You are the UnderScope AI Research Analyst. You help investigate public companies. "
    "Focus on 'What might the market be missing?' — surface contradictions, second-order effects, "
    "dependencies, and risks. Cite the provided company context when relevant.\n\n"
    "Rules:\n"
    "1) You never provide personalized buy/sell recommendations, price targets, or guarantees.\n"
    "2) Clearly distinguish FACT, REPORTED EVENT, AI INTERPRETATION, and SCENARIO ASSUMPTION.\n"
    "3) Prefer concise, information-dense, analyst-grade writing. Use short paragraphs and bullets when helpful.\n"
    "4) When you are speculating, say so and label it as SCENARIO or INTERPRETATION.\n"
    "5) End with a one-line 'What to watch next' takeaway when appropriate.\n"
)


@api_router.post("/assistant/ask")
async def assistant_ask(req: AskRequest):
    """Streaming SSE endpoint for the AI research assistant (Claude Sonnet 5)."""
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

    session_id = req.session_id or str(uuid.uuid4())
    ctx = _company_context(req.ticker) if req.ticker else ""
    system_msg = SYSTEM_PROMPT + ("\n\nCOMPANY CONTEXT:\n" + ctx if ctx else "")

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=system_msg,
    ).with_model("anthropic", "claude-sonnet-5")

    user_msg = UserMessage(text=req.question)

    async def event_gen():
        try:
            async for ev in chat.stream_message(user_msg):
                if isinstance(ev, TextDelta):
                    # JSON-encode payload so newlines inside deltas don't break SSE frames.
                    yield "data: " + json.dumps({"t": ev.content}) + "\n\n"
                elif isinstance(ev, StreamDone):
                    yield "event: done\ndata: [DONE]\n\n"
                    break
        except Exception as e:
            logger.exception("assistant stream failed")
            yield "event: error\ndata: " + json.dumps({"error": str(e)}) + "\n\n"

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
