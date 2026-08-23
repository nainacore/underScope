# UnderScope — PRD

## Original problem statement
Build a premium financial research & investigation platform called **UnderScope** — AI-powered financial intelligence that helps users investigate public companies and discover overlooked signals, risks, contradictions, dependencies, and second-order effects. Central question: **"What am I missing?"**  
Tagline: *See what the market is missing. · Investigate beyond the price.*

## Architecture (v1)
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn UI + custom SVG charts + react-markdown/remark-gfm.
- **Backend**: FastAPI + Motor (Mongo dep present, unused in v1 — reserved for future watchlist/history).
- **AI**: Claude Sonnet 5 via `emergentintegrations` (Universal `EMERGENT_LLM_KEY`), SSE-streamed to `/api/assistant/ask`. Each SSE delta is JSON-encoded (`data: {"t": "..."}`) to survive newlines.
- **Data**: Realistic demo/seed data in `/app/backend/seed.py`; all responses include `"demo": true`.
- **Persistence**: Watchlist in browser LocalStorage.

## Coverage (v1)
- 24 companies across US + India (NVDA, AAPL, MSFT, GOOGL, AMZN, META, NFLX, TSLA, JPM, GS, V, MA, BLK, KO, MCD, WMT, JNJ, RELIANCE, TCS, TATAMOTORS, HDFCBANK, ICICIBANK, INFY, ETERNAL).

## User personas
- Retail investor / student who wants sophisticated framing without a Bloomberg terminal.
- Analyst who wants a fast dossier + investigation lens on any covered company.

## Core requirements (static)
1. Left sidebar navigation, top-bar global search (Cmd/Ctrl-K), footer disclaimer.
2. Home / Discover with Market Overview, Trending Companies, Market Signals.
3. Company page tabs: Overview · Investigation · Financials · News · Events · Dependencies · Scenarios · Research.
4. Signature **UnderScope Investigation** cards (Finding / Why it matters / Evidence / Metrics / Sources / Confidence / Type badge Fact–Event–AI–Scenario).
5. **Why did the stock move?** event-analysis panel on Overview.
6. **Dependencies** interactive accordion (visual network deferred to a later phase).
7. **Scenario Lab** — global slider sandbox + per-company scenarios; explicit "not a price prediction" disclaimer.
8. **Compare** side-by-side (2–4 tickers) framed as "where are the biggest differences?" — never "which to buy".
9. **Watchlist** — LocalStorage; upgradeable to per-user backend later.
10. **AI Research Analyst** — contextual (loads company context server-side), streaming, markdown, distinguishes FACT / REPORTED EVENT / AI INTERPRETATION / SCENARIO ASSUMPTION.
11. Educational-only disclaimer on every page; no personalised buy/sell advice.

## What's been implemented (2026-02)
- ✅ Sidebar + topbar shell with Cmd-K global search, mobile-friendly Ask Analyst.
- ✅ Home (indices, trending, signals) + Discover (curated themes + sector filter).
- ✅ Companies list with country/text filter + institutional table.
- ✅ Company page with all 8 tabs, price chart with crosshair, watchlist toggle, "Ask Analyst" grounded to ticker.
- ✅ Investigations page (themes → affected tickers) + signature Investigation cards.
- ✅ Financials tab (Income Statement, Balance Sheet, Cash Flow, mini bar chart).
- ✅ News, Events (timeline), Dependencies (accordion with narratives).
- ✅ Scenario Lab (global) + per-company scenario tab (sliders → business impact).
- ✅ Compare page (2–4 tickers, add/remove, "biggest differences" framing).
- ✅ Watchlist (LocalStorage) + Research feed + Settings.
- ✅ AI Assistant: Claude Sonnet 5 streaming SSE with JSON framing + markdown/GFM rendering + partial-text preservation on error.
- ✅ Testing subagent iteration 1 & 2 — all critical items resolved.

## Prioritized backlog (post-v1)
- **P1**: Interactive dependency-network graph (visual force-directed / radial layout).
- **P1**: Ripple Effects visual causal graph (rates ↑ → margins → competitors → consumers).
- **P1**: Real market data adapter (alpha vantage / yfinance) behind the same endpoints, feature-flagged.
- **P2**: Per-user backend watchlist with Emergent Google auth.
- **P2**: Persist AI Q&A history in Mongo per session.
- **P2**: Add remaining companies + international coverage.
- **P3**: Split Company.jsx into per-tab files, add per-tab lazy loading.
- **P3**: Silence `<option>`-child console warning on Compare picker (swap to Shadcn Select).
