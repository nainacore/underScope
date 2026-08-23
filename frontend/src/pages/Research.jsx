import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export default function Research() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Aggregate news from all covered companies for a research feed.
    api.listCompanies().then(async (r) => {
      const tickers = (r.items || []).map((c) => c.ticker);
      const chunks = await Promise.all(tickers.map((t) => api.getNews(t).catch(() => ({ items: [] }))));
      const flat = chunks.flatMap((c, i) => (c.items || []).map((n) => ({ ...n, ticker: tickers[i] })));
      flat.sort((a, b) => (a.date < b.date ? 1 : -1));
      setItems(flat);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Feed</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Research</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">Recent research-worthy items across the covered universe. Source and date preserved on every item.</p>
      </div>
      <div className="space-y-3">
        {items.length === 0 && <div className="border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading feed…</div>}
        {items.map((n, i) => (
          <article key={i} className="border border-slate-200 bg-white p-5 hover:border-slate-400">
            <div className="flex items-center justify-between text-[10px] font-mono-num text-slate-500 tracking-widest uppercase">
              <span>{n.date} · {n.source} · <Link to={`/company/${n.ticker}`} className="hover:text-slate-900 underline underline-offset-4">{n.ticker}</Link></span>
              <span>{n.topic}</span>
            </div>
            <h3 className="font-editorial text-xl text-slate-900 mt-1">{n.title}</h3>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed max-w-3xl">{n.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
