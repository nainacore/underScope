"""UnderScope backend API tests (companies, market, compare, assistant SSE)."""
import json
import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"

VALID_TYPES = {"verified_fact", "reported_event", "ai_interpretation", "scenario_assumption"}


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/", timeout=30)
        assert r.status_code == 200
        assert r.json()["status"] == "ok"


# ---------------- Companies module ----------------
class TestCompanies:
    def test_list_companies(self, client):
        r = client.get(f"{API}/companies", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert d["count"] == 24, f"expected 24 companies, got {d['count']}"
        assert len(d["items"]) == 24
        for c in d["items"]:
            for k in ("ticker", "name", "price", "sector", "change_pct", "market_cap_b", "currency"):
                assert k in c, f"missing {k} in {c.get('ticker')}"
            assert isinstance(c["price"], (int, float))

    def test_list_companies_search_filter(self, client):
        r = client.get(f"{API}/companies", params={"q": "nvda"}, timeout=30)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 1
        assert any(c["ticker"] == "NVDA" for c in items)

    def test_get_company_full(self, client):
        r = client.get(f"{API}/companies/NVDA", timeout=30)
        assert r.status_code == 200
        c = r.json()["company"]
        assert c["ticker"] == "NVDA"
        for k in ("snapshot", "hq", "employees", "founded", "last_updated", "price", "sector"):
            assert k in c, f"missing {k}"
        assert c["price"] == 892.41

    def test_get_company_case_insensitive(self, client):
        r = client.get(f"{API}/companies/nvda", timeout=30)
        assert r.status_code == 200
        assert r.json()["company"]["ticker"] == "NVDA"

    def test_get_company_404(self, client):
        r = client.get(f"{API}/companies/ZZZZ", timeout=30)
        assert r.status_code == 404

    def test_price_history(self, client):
        r = client.get(f"{API}/companies/NVDA/price-history", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert d["ticker"] == "NVDA"
        series = d["series"]
        assert len(series) == 120, f"expected 120 points, got {len(series)}"
        assert all(isinstance(x, (int, float)) for x in series)
        assert series[-1] == 892.41

    def test_price_history_404(self, client):
        r = client.get(f"{API}/companies/ZZZZ/price-history", timeout=30)
        assert r.status_code == 404

    def test_financials(self, client):
        r = client.get(f"{API}/companies/NVDA/financials", timeout=30)
        assert r.status_code == 200
        f = r.json()["financials"]
        assert "currency" in f
        inc = f["income_statement"]
        for k in ("revenue", "gross_profit", "operating_income", "net_income", "eps"):
            assert k in inc, f"income_statement missing {k}"
            assert len(inc[k]) == 4, f"{k} should have 4 years, got {len(inc[k])}"
        assert "balance_sheet" in f and "cash_flow" in f
        assert len(f["balance_sheet"]) > 0 and len(f["cash_flow"]) > 0

    def test_investigations(self, client):
        r = client.get(f"{API}/companies/NVDA/investigations", timeout=30)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 3, f"expected >=3 cards, got {len(items)}"
        for card in items:
            for k in ("category", "type", "confidence", "finding", "why", "evidence", "metrics", "sources"):
                assert k in card, f"card missing {k}"
            assert card["type"] in VALID_TYPES, f"bad type {card['type']}"
            assert 0 <= card["confidence"] <= 100

    def test_investigations_all_companies_non_empty(self, client):
        tickers = [c["ticker"] for c in client.get(f"{API}/companies", timeout=30).json()["items"]]
        empty = []
        bad_type = []
        for t in tickers:
            r = client.get(f"{API}/companies/{t}/investigations", timeout=30)
            assert r.status_code == 200, t
            items = r.json()["items"]
            if not items:
                empty.append(t)
            for card in items:
                if card.get("type") not in VALID_TYPES:
                    bad_type.append((t, card.get("type")))
        assert not empty, f"companies with empty investigations: {empty}"
        assert not bad_type, f"invalid types: {bad_type}"

    def test_news_events_dependencies(self, client):
        rn = client.get(f"{API}/companies/NVDA/news", timeout=30)
        assert rn.status_code == 200
        assert isinstance(rn.json()["items"], list) and len(rn.json()["items"]) > 0
        re_ = client.get(f"{API}/companies/NVDA/events", timeout=30)
        assert re_.status_code == 200
        assert isinstance(re_.json()["items"], list) and len(re_.json()["items"]) > 0
        rd = client.get(f"{API}/companies/NVDA/dependencies", timeout=30)
        assert rd.status_code == 200
        dep = rd.json()["dependency_map"]
        assert isinstance(dep, dict) and len(dep) > 0

    def test_news_404_unknown_ticker(self, client):
        r = client.get(f"{API}/companies/ZZZZ/news", timeout=30)
        assert r.status_code == 404, f"expected 404 got {r.status_code}: {r.text[:200]}"

    def test_events_404_unknown_ticker(self, client):
        r = client.get(f"{API}/companies/ZZZZ/events", timeout=30)
        assert r.status_code == 404, f"expected 404 got {r.status_code}: {r.text[:200]}"

    def test_dependencies_404_unknown_ticker(self, client):
        r = client.get(f"{API}/companies/ZZZZ/dependencies", timeout=30)
        assert r.status_code == 404, f"expected 404 got {r.status_code}: {r.text[:200]}"

    def test_all_companies_endpoints_ok(self, client):
        tickers = [c["ticker"] for c in client.get(f"{API}/companies", timeout=30).json()["items"]]
        failures = []
        for t in tickers:
            for suffix in ("", "/price-history", "/financials", "/news", "/events", "/dependencies"):
                r = client.get(f"{API}/companies/{t}{suffix}", timeout=30)
                if r.status_code != 200:
                    failures.append((t, suffix, r.status_code))
        assert not failures, f"non-200 responses: {failures}"


# ---------------- Market module ----------------
class TestMarket:
    def test_overview(self, client):
        r = client.get(f"{API}/market/overview", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert len(d["indices"]) >= 8, f"indices={len(d['indices'])}"
        assert len(d["signals"]) >= 6, f"signals={len(d['signals'])}"
        assert len(d["trending"]) > 0

    def test_trending(self, client):
        r = client.get(f"{API}/market/trending", timeout=30)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) > 0
        assert all("ticker" in i and "price" in i for i in items)

    def test_signals(self, client):
        r = client.get(f"{API}/market/signals", timeout=30)
        assert r.status_code == 200
        assert len(r.json()["items"]) >= 6


# ---------------- Compare module ----------------
class TestCompare:
    def test_compare_two(self, client):
        r = client.post(f"{API}/compare", json={"tickers": ["NVDA", "AAPL"]}, timeout=30)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) == 2
        assert [i["ticker"] for i in items] == ["NVDA", "AAPL"]
        for i in items:
            assert "financials" in i and i["financials"]
            assert "income_statement" in i["financials"]
            assert "snapshot" in i

    def test_compare_one_ticker_400(self, client):
        r = client.post(f"{API}/compare", json={"tickers": ["NVDA"]}, timeout=30)
        assert r.status_code == 400

    def test_compare_five_ticker_400(self, client):
        r = client.post(f"{API}/compare", json={"tickers": ["NVDA", "AAPL", "MSFT", "TSLA", "META"]}, timeout=30)
        assert r.status_code == 400

    def test_compare_unknown_ticker_404(self, client):
        r = client.post(f"{API}/compare", json={"tickers": ["NVDA", "ZZZZ"]}, timeout=30)
        assert r.status_code == 404

    def test_compare_missing_body_422(self, client):
        r = client.post(f"{API}/compare", json={}, timeout=30)
        assert r.status_code == 422


# ---------------- AI Assistant SSE ----------------
def _read_sse(payload, timeout=240):
    """Return (raw_body, frames, aggregated_text, saw_done, errors) using client-identical parsing."""
    with requests.post(f"{API}/assistant/ask", json=payload, stream=True, timeout=timeout) as r:
        assert r.status_code == 200, f"{r.status_code}: {r.text[:300]}"
        assert "text/event-stream" in r.headers.get("content-type", ""), r.headers.get("content-type")
        raw = ""
        for chunk in r.iter_content(chunk_size=None):
            raw += chunk.decode("utf-8", "ignore") if isinstance(chunk, bytes) else chunk
    frames = [f for f in raw.split("\n\n") if f.strip()]
    text = ""
    saw_done = False
    errors = []
    for f in frames:
        event = "message"
        data = ""
        for line in f.split("\n"):
            if line.startswith("event:"):
                event = line[6:].strip()
            elif line.startswith("data:"):
                data += ("\n" if data else "") + line[5:].lstrip(" ")
        if event == "done":
            saw_done = True
        elif event == "error":
            errors.append(data)
        elif data:
            obj = json.loads(data)  # must be JSON-encoded per fix
            assert isinstance(obj, dict) and "t" in obj, f"frame not {{'t':...}}: {data[:120]}"
            text += obj["t"]
    return raw, frames, text, saw_done, errors


class TestAssistant:
    def test_assistant_stream(self, client):
        raw, frames, text, saw_done, errors = _read_sse(
            {"ticker": "NVDA", "question": "What are NVIDIA biggest dependencies?"}
        )
        assert not errors, f"error frames: {errors}"
        assert saw_done, f"missing done. raw tail: {raw[-300:]}"
        assert len(text.strip()) > 50, f"too short: {text[:200]!r}"

    def test_assistant_no_ticker(self, client):
        _, _, text, saw_done, errors = _read_sse(
            {"question": "What is a good framework to investigate supply chain risk?"}
        )
        assert not errors, f"error frames: {errors}"
        assert saw_done
        assert len(text.strip()) > 20, f"too short: {text!r}"

    def test_assistant_missing_question_422(self, client):
        r = client.post(f"{API}/assistant/ask", json={"ticker": "NVDA"}, timeout=60)
        assert r.status_code == 422

    def test_assistant_multiline_integrity(self, client):
        """Every frame must carry a data:/event: prefix and be JSON-decodable; newlines must survive."""
        raw, frames, text, saw_done, errors = _read_sse(
            {
                "ticker": "AAPL",
                "question": "List exactly 3 markdown bullet points about Apple's key dependencies, one per line, with a bold lead-in each.",
            }
        )
        orphan = [f for f in frames if not (f.startswith("data:") or f.startswith("event:"))]
        assert not orphan, f"{len(orphan)} orphan frames: {orphan[:3]}"
        assert not errors, f"error frames: {errors}"
        assert saw_done
        assert "\n" in text, f"no newline survived in aggregated text: {text[:300]!r}"
        # Byte-integrity: sum of json payload lengths equals aggregated length (no loss)
        json_len = sum(
            len(json.loads(l[5:].lstrip(" "))["t"])
            for f in frames
            if f.startswith("data:")
            for l in f.split("\n")
            if l.startswith("data:")
        )
        assert json_len == len(text), f"length mismatch json={json_len} agg={len(text)}"
        print(json.dumps({"frames": len(frames), "chars": len(text), "newlines": text.count("\n")}))
