import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtLargeMoney, fmtNum, fmtPct, trendArrow, trendColor } from "@/lib/format";

const THEMES = [
  { id: "ai-infra", title: "AI Infrastructure", tickers: ["NVDA", "MSFT", "GOOGL", "AMZN", "META"] },
  { id: "indian-large-caps", title: "Indian Large Caps", tickers: ["RELIANCE", "TCS", "HDFCBANK", "ICICIBANK", "INFY"] },
  { id: "consumer-brands", title: "Global Consumer Brands", tickers: ["AAPL", "KO", "MCD", "WMT"] },
  { id: "financial-plumbing", title: "Financial Plumbing", tickers: ["V", "MA", "JPM", "GS", "BLK"] },
  { id: "mobility-energy", title: "Mobility & Energy Transition", tickers: ["TSLA", "TATAMOTORS", "RELIANCE"] },
  { id: "streaming-platforms", title: "Streaming & Platforms", tickers: ["NFLX", "META", "ETERNAL"] },
];

export default function Discover() {
  const [universe, setUniverse] = useState([]);
  const [sector, setSector] = useState("all");

  useEffect(() => { api.listCompanies().then((r) => setUniverse(r.items || [])); }, []);

  const sectors = useMemo(() => {
    const s = new Set(universe.map((c) => c.sector));
    return ["all", ...Array.from(s).sort()];
  }, [universe]);

  const bySector = sector === "all" ? universe : universe.filter((c) => c.sector === sector);
  const byTicker = useMemo(() => Object.fromEntries(universe.map((c) => [c.ticker, c])), [universe]);

  return (
    <div className="space-y-10 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Explore</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Discover</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Browse the universe by theme or sector, then dig into any company.
        </p>
      </div>

      <section>
        <h2 className="font-editorial text-2xl text-slate-900 mb-3">Curated themes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <div key={t.id} className="border border-slate-200 bg-white p-4">
              <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">{t.tickers.length} companies</div>
              <h3 className="font-editorial text-xl text-slate-900 mt-1">{t.title}</h3>
              <div className="mt-3 space-y-1.5">
                {t.tickers.map((tk) => {
                  const c = byTicker[tk];
                  if (!c) return null;
                  return (
                    <Link key={tk} to={`/company/${tk}`} className="flex items-center gap-3 hover:bg-slate-50 -mx-2 px-2 py-1.5" data-testid={`discover-theme-${t.id}-${tk}`}>
                      <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={24} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-900 truncate">{c.name}</div>
                        <div className="text-[10px] font-mono-num text-slate-500">{c.ticker}</div>
                      </div>
                      <div className={`font-mono-num text-xs ${trendColor(c.change_pct)}`}>{trendArrow(c.change_pct)} {fmtPct(c.change_pct)}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-editorial text-2xl text-slate-900">Browse by sector</h2>
          <select value={sector} onChange={(e) => setSector(e.target.value)} className="text-sm border border-slate-200 px-3 py-1.5 bg-white" data-testid="discover-sector">
            {sectors.map((s) => <option key={s} value={s}>{s === "all" ? "All sectors" : s}</option>)}
          </select>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {bySector.map((c) => (
            <Link key={c.ticker} to={`/company/${c.ticker}`} className="border border-slate-200 bg-white p-4 hover:border-slate-400 block" data-testid={`discover-sector-card-${c.ticker}`}>
              <div className="flex items-start gap-3">
                <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-mono-num text-slate-500">{c.ticker} · {c.sector}</div>
                  <div className="text-sm text-slate-900 truncate">{c.name}</div>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="font-mono-num text-slate-900">{c.currency}{fmtNum(c.price)}</div>
                <div className={`font-mono-num text-xs ${trendColor(c.change_pct)}`}>{trendArrow(c.change_pct)} {fmtPct(c.change_pct)}</div>
              </div>
              <div className="text-[11px] font-mono-num text-slate-500 mt-1">MCap {fmtLargeMoney(c.market_cap_b)}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
