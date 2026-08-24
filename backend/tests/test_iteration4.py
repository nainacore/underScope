"""Iteration 4 backend tests: financials derivation, enriched dependency map, ripples endpoints."""
import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
API = base_url.rstrip("/") + "/api"

VALID_KINDS = {"supplier", "customer", "competitor", "regulation", "macro",
               "commodity", "moat", "technology", "optionality", "capex"}


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Financials seed polish ----------------
class TestFinancials:
    def test_nvda_financials_consistent(self, client):
        r = client.get(f"{API}/companies/NVDA/financials", timeout=30)
        assert r.status_code == 200
        f = r.json()["financials"]
        rev = f["income_statement"]["revenue"]
        ni = f["income_statement"]["net_income"]
        eps = f["income_statement"]["eps"]
        assert len(rev) == len(f["years"]) == 4
        assert 658.8 not in rev, f"stale bogus revenue present: {rev}"
        assert 60 <= rev[-1] <= 120, f"FY24 revenue out of expected range: {rev[-1]}"
        # net income should be ~ market_cap / pe
        comp = client.get(f"{API}/companies/NVDA", timeout=30).json()["company"]
        expected_ni = comp["market_cap_b"] / comp["pe"]
        assert abs(ni[-1] - expected_ni) / expected_ni < 0.05, f"{ni[-1]} vs {expected_ni}"
        # eps latest equals eps_ttm, and series increasing (back-cast)
        assert abs(eps[-1] - comp["eps_ttm"]) < 0.01, f"eps[-1]={eps[-1]} eps_ttm={comp['eps_ttm']}"
        assert eps == sorted(eps), f"eps not monotonic back-cast: {eps}"
        assert rev == sorted(rev), f"revenue not monotonic: {rev}"

    def test_financials_internal_coherence_all_companies(self, client):
        tickers = [c["ticker"] for c in client.get(f"{API}/companies", timeout=30).json()["items"]]
        bad = []
        for t in tickers:
            f = client.get(f"{API}/companies/{t}/financials", timeout=30).json()["financials"]
            i = f["income_statement"]
            if not (i["gross_profit"][-1] < i["revenue"][-1]):
                bad.append((t, "gross_profit >= revenue"))
            if not (i["net_income"][-1] <= i["operating_income"][-1] * 1.5):
                bad.append((t, "net_income implausible vs operating_income"))
            if f["cash_flow"]["capex"][-1] > 0:
                bad.append((t, "capex should be negative"))
        assert not bad, f"financial coherence issues: {bad}"

    def test_financials_404(self, client):
        assert client.get(f"{API}/companies/ZZZZ/financials", timeout=30).status_code == 404


# ---------------- Enriched dependency map ----------------
class TestDependencies:
    def test_nvda_dependencies_enriched(self, client):
        r = client.get(f"{API}/companies/NVDA/dependencies", timeout=30)
        assert r.status_code == 200
        dm = r.json()["dependency_map"]
        nodes = dm["nodes"]
        assert len(nodes) >= 8, f"only {len(nodes)} nodes"
        for n in nodes:
            for k in ("label", "kind", "relationship", "impact", "confidence", "evidence"):
                assert k in n, f"missing {k} in node {n.get('label')}"
            assert n["kind"] in VALID_KINDS, f"bad kind {n['kind']}"
            assert isinstance(n["confidence"], (int, float))
            assert 0 <= n["confidence"] <= 100

    def test_all_companies_dependencies_enriched(self, client):
        tickers = [c["ticker"] for c in client.get(f"{API}/companies", timeout=30).json()["items"]]
        problems = []
        for t in tickers:
            r = client.get(f"{API}/companies/{t}/dependencies", timeout=30)
            if r.status_code != 200:
                problems.append((t, r.status_code))
                continue
            dm = r.json()["dependency_map"]
            if dm.get("ticker") != t:
                problems.append((t, "ticker mismatch"))
            nodes = dm.get("nodes", [])
            # NOTE: TCS & HDFCBANK presets only carry 4 nodes (thinner than peers) - reported as minor
            if len(nodes) < 4:
                problems.append((t, f"only {len(nodes)} nodes"))
            for n in nodes:
                if not isinstance(n, dict) or n.get("kind") not in VALID_KINDS:
                    problems.append((t, f"bad node {n}"))
                elif not n.get("relationship") or not n.get("impact"):
                    problems.append((t, f"empty relationship/impact for {n.get('label')}"))
        assert not problems, f"dependency issues: {problems}"

    def test_dependencies_404(self, client):
        assert client.get(f"{API}/companies/ZZZZ/dependencies", timeout=30).status_code == 404


# ---------------- Ripples ----------------
class TestRipples:
    def test_list_ripples(self, client):
        r = client.get(f"{API}/ripples", timeout=30)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 4
        ids = [i["id"] for i in items]
        for expected in ["rates-up", "oil-up", "usdinr-up", "aicapex-up"]:
            assert expected in ids, f"{expected} missing from {ids}"
        known_tickers = {c["ticker"] for c in client.get(f"{API}/companies", timeout=30).json()["items"]}
        for rip in items:
            for k in ("title", "shortLabel", "kind", "summary", "tree"):
                assert k in rip, f"{rip['id']} missing {k}"
            tree = rip["tree"]
            assert tree.get("label")
            primaries = tree.get("children") or []
            assert len(primaries) >= 2, f"{rip['id']} has {len(primaries)} primaries"
            for p in primaries:
                assert p.get("label")
                markets = p.get("children") or []
                assert len(markets) >= 1, f"{rip['id']}/{p['label']} has no market children"
                for m in markets:
                    assert m.get("label")
                    for t in (m.get("affects") or []):
                        assert t in known_tickers, f"{rip['id']} affects unknown ticker {t}"

    def test_get_ripple_by_id(self, client):
        r = client.get(f"{API}/ripples/rates-up", timeout=30)
        assert r.status_code == 200
        rip = r.json()["ripple"]
        assert rip["id"] == "rates-up"
        assert rip["tree"]["children"]

    def test_get_ripple_unknown_404(self, client):
        r = client.get(f"{API}/ripples/unknown", timeout=30)
        assert r.status_code == 404
