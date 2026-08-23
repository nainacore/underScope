import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { api } from "@/lib/api";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtPct, trendColor } from "@/lib/format";

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    api.listCompanies({ q }).then((r) => setItems(r.items || [])).catch(() => setItems([]));
  }, [q, open]);

  const go = (t) => {
    setOpen(false);
    setQ("");
    nav(`/company/${t}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 w-full md:w-[420px] border border-slate-200 bg-white px-3 py-2 text-left hover:border-slate-400"
        data-testid="global-search-trigger"
      >
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <Search size={14} />
          Search companies, topics, events…
        </span>
        <span className="hidden md:inline text-[10px] font-mono-num text-slate-400 border border-slate-200 px-1.5 py-0.5">
          ⌘K
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-24 max-w-2xl bg-white border border-slate-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Global search"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <Search size={16} className="text-slate-500" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="NVIDIA · Reliance · AI spending · oil prices · semiconductor…"
                className="flex-1 outline-none text-sm bg-transparent placeholder:text-slate-400"
                data-testid="global-search-input"
              />
              <button onClick={() => setOpen(false)} data-testid="global-search-close" aria-label="Close">
                <X size={16} className="text-slate-500 hover:text-slate-900" />
              </button>
            </div>
            <div className="max-h-[420px] overflow-auto">
              {items.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">No matches. Try a ticker or sector.</div>
              ) : (
                <ul>
                  {items.map((c) => (
                    <li key={c.ticker}>
                      <button
                        onClick={() => go(c.ticker)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left border-b border-slate-100"
                        data-testid={`global-search-result-${c.ticker}`}
                      >
                        <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={32} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-900 truncate">{c.name}</div>
                          <div className="text-[11px] font-mono-num text-slate-500 truncate">
                            {c.ticker} · {c.exchange} · {c.sector}
                          </div>
                        </div>
                        <div className={`font-mono-num text-sm ${trendColor(c.change_pct)}`}>{fmtPct(c.change_pct)}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
