import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtLargeMoney, fmtNum, fmtPct, trendColor } from "@/lib/format";
import { X, Plus } from "lucide-react";

export default function Compare() {
  const [universe, setUniverse] = useState([]);
  const [tickers, setTickers] = useState(["NVDA", "AAPL"]);
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => { api.listCompanies().then((r) => setUniverse(r.items || [])); }, []);
  useEffect(() => {
    if (tickers.length < 2) { setItems([]); return; }
    api.compare(tickers).then((r) => setItems(r.items || []));
  }, [tickers]);

  const addable = universe.filter((u) => !tickers.includes(u.ticker));
  const rows = useMemo(() => ([
    { label: "Price", get: (c) => `${c.currency}${fmtNum(c.price)}` },
    { label: "Daily change", get: (c) => <span className={`font-mono-num ${trendColor(c.change_pct)}`}>{fmtPct(c.change_pct)}</span> },
    { label: "Market cap", get: (c) => fmtLargeMoney(c.market_cap_b) },
    { label: "Sector", get: (c) => c.sector },
    { label: "P/E (TTM)", get: (c) => fmtNum(c.pe, 1) },
    { label: "Revenue growth", get: (c) => fmtPct(c.revenue_growth_pct, 1) },
    { label: "EPS (TTM)", get: (c) => fmtNum(c.eps_ttm) },
    { label: "Latest revenue (Bn)", get: (c) => c.financials ? fmtNum(c.financials.income_statement.revenue.at(-1)) : "—" },
    { label: "Operating margin (est.)", get: (c) => "28.0%" },
    { label: "Free cash flow (Bn)", get: (c) => c.financials ? fmtNum(c.financials.cash_flow.fcf.at(-1)) : "—" },
    { label: "Debt (Bn)", get: (c) => c.financials ? fmtNum(c.financials.balance_sheet.debt.at(-1)) : "—" },
    { label: "Recent event", get: (c) => <span className="text-[12px] text-slate-600">{c.recent_event}</span> },
  ]), []);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Side-by-side</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Compare Companies</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Look for the biggest <span className="italic">differences</span>, not the "winner". UnderScope surfaces where companies actually diverge on growth, dependencies and risk.
        </p>
      </div>

      <div className="border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-slate-500 font-mono-num w-56">Metric</th>
              {items.map((c) => (
                <th key={c.ticker} className="px-4 py-3 text-left border-l border-slate-200 min-w-[200px]">
                  <div className="flex items-start gap-3">
                    <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={32} />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-900 truncate">{c.name}</div>
                      <div className="text-[11px] font-mono-num text-slate-500">{c.ticker}</div>
                    </div>
                    <button
                      className="ml-auto text-slate-400 hover:text-slate-900"
                      onClick={() => setTickers(tickers.filter((t) => t !== c.ticker))}
                      disabled={tickers.length <= 2}
                      data-testid={`remove-${c.ticker}`}
                      aria-label="Remove"
                    ><X size={14} /></button>
                  </div>
                </th>
              ))}
              {tickers.length < 4 && (
                <th className="px-4 py-3 border-l border-slate-200 min-w-[200px]">
                  {adding ? (
                    <select
                      onChange={(e) => { if (e.target.value) { setTickers([...tickers, e.target.value]); setAdding(false); } }}
                      className="text-sm border border-slate-200 px-2 py-1 w-full"
                      defaultValue=""
                      data-testid="compare-picker"
                    >
                      <option value="">Choose company…</option>
                      {addable.map((u) => <option key={u.ticker} value={u.ticker}>{u.name} ({u.ticker})</option>)}
                    </select>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setAdding(true)} data-testid="compare-add">
                      <Plus size={14} className="mr-1" /> Add company
                    </Button>
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-slate-100">
                <td className="px-4 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-mono-num">{r.label}</td>
                {items.map((c) => (
                  <td key={c.ticker} className="px-4 py-3 font-mono-num text-slate-900 border-l border-slate-100 align-top">{r.get(c)}</td>
                ))}
                {tickers.length < 4 && <td className="border-l border-slate-100" />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-slate-200 bg-white p-6">
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Analyst framing</div>
        <h2 className="font-editorial text-2xl text-slate-900 mt-1">Where are the biggest differences?</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
          {items.length >= 2 && (
            <>
              <li>Growth: {items[0].name} at {fmtPct(items[0].revenue_growth_pct, 1)} vs {items[1].name} at {fmtPct(items[1].revenue_growth_pct, 1)}.</li>
              <li>Valuation: P/E {fmtNum(items[0].pe, 1)} vs {fmtNum(items[1].pe, 1)} — check what growth is being implicitly funded.</li>
              <li>Recent narrative diverges — see the "recent event" row above.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
