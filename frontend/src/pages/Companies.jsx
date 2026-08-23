import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Input } from "@/components/ui/input";
import { fmtLargeMoney, fmtNum, fmtPct, trendArrow, trendColor } from "@/lib/format";

export default function Companies() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");

  useEffect(() => {
    api.listCompanies().then((r) => setItems(r.items || []));
  }, []);

  const filtered = useMemo(() => {
    let arr = items;
    if (country !== "all") arr = arr.filter((c) => c.country === country);
    if (q) {
      const ql = q.toLowerCase();
      arr = arr.filter((c) => c.name.toLowerCase().includes(ql) || c.ticker.toLowerCase().includes(ql) || c.sector.toLowerCase().includes(ql));
    }
    return arr;
  }, [items, q, country]);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Universe</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Companies</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Public companies covered in the UnderScope research universe. Additional coverage can be added later.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name, ticker, sector…"
          className="md:max-w-sm"
          data-testid="companies-filter"
        />
        <div className="flex gap-2">
          {[
            { k: "all", l: "All" },
            { k: "US", l: "United States" },
            { k: "IN", l: "India" },
          ].map((o) => (
            <button
              key={o.k}
              onClick={() => setCountry(o.k)}
              className={`text-xs px-3 py-1.5 border ${country === o.k ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"}`}
              data-testid={`filter-country-${o.k}`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500 font-mono-num">
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Sector</th>
              <th className="text-right px-4 py-3">Price</th>
              <th className="text-right px-4 py-3">Change</th>
              <th className="text-right px-4 py-3">Mkt Cap</th>
              <th className="text-right px-4 py-3">P/E</th>
              <th className="text-right px-4 py-3">Rev Growth</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.ticker} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`company-row-${c.ticker}`}>
                <td className="px-4 py-3">
                  <Link to={`/company/${c.ticker}`} className="flex items-center gap-3">
                    <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={28} />
                    <div>
                      <div className="text-slate-900">{c.name}</div>
                      <div className="text-[11px] font-mono-num text-slate-500">{c.ticker} · {c.exchange}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-700">{c.sector}</td>
                <td className="px-4 py-3 text-right font-mono-num text-slate-900">{c.currency}{fmtNum(c.price)}</td>
                <td className={`px-4 py-3 text-right font-mono-num ${trendColor(c.change_pct)}`}>
                  {trendArrow(c.change_pct)} {fmtPct(c.change_pct)}
                </td>
                <td className="px-4 py-3 text-right font-mono-num text-slate-900">{fmtLargeMoney(c.market_cap_b)}</td>
                <td className="px-4 py-3 text-right font-mono-num text-slate-700">{fmtNum(c.pe, 1)}</td>
                <td className="px-4 py-3 text-right font-mono-num text-slate-700">{fmtPct(c.revenue_growth_pct, 1)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center text-sm text-slate-500">No companies match your filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
