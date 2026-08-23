import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useWatchlist } from "@/hooks/useWatchlist";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtNum, fmtPct, trendArrow, trendColor } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, X } from "lucide-react";

export default function Watchlist() {
  const { list, remove } = useWatchlist();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!list.length) { setItems([]); return; }
    api.listCompanies().then((r) => {
      setItems((r.items || []).filter((c) => list.includes(c.ticker)));
    });
  }, [list]);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Personal</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Watchlist</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Companies you're tracking. Stored locally in your browser — no account required.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-slate-300 bg-white p-10 text-center">
          <Star className="mx-auto text-slate-400" size={22} />
          <p className="text-sm text-slate-600 mt-3">Your watchlist is empty. Add companies from any company page.</p>
          <Link to="/companies" className="inline-block mt-4 text-sm underline underline-offset-4">
            Browse universe →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((c) => (
            <div key={c.ticker} className="border border-slate-200 bg-white p-4 flex items-center gap-4 hover:border-slate-400">
              <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={40} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-mono-num text-slate-500">{c.ticker} · {c.sector}</div>
                <Link to={`/company/${c.ticker}`} className="text-sm text-slate-900 hover:underline underline-offset-4">
                  {c.name}
                </Link>
                <p className="text-[12px] text-slate-600 mt-1 line-clamp-1">{c.recent_event}</p>
              </div>
              <div className="text-right">
                <div className="font-mono-num text-lg text-slate-900">{c.currency}{fmtNum(c.price)}</div>
                <div className={`font-mono-num text-sm ${trendColor(c.change_pct)}`}>{trendArrow(c.change_pct)} {fmtPct(c.change_pct)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" onClick={() => window.dispatchEvent(new CustomEvent("underscope:open-assistant", { detail: { ticker: c.ticker, name: c.name } }))} data-testid={`wl-ask-${c.ticker}`}>
                  <Sparkles size={12} className="mr-1" /> Investigate
                </Button>
                <button onClick={() => remove(c.ticker)} className="text-slate-500 hover:text-red-700 text-xs flex items-center justify-center gap-1" data-testid={`wl-remove-${c.ticker}`}>
                  <X size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
