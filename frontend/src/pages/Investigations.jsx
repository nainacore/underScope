import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function Investigations() {
  const [signals, setSignals] = useState([]);
  const [params] = useSearchParams();
  const focus = params.get("signal");

  useEffect(() => { api.getSignals().then((r) => setSignals(r.items || [])); }, []);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Cross-market</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Live Investigations</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Themes reshaping how public companies earn today. Each theme lists directly-affected companies you can dig into.
        </p>
      </div>

      <div className="space-y-3">
        {signals.map((s) => (
          <article key={s.id} id={s.id} className={`border ${focus === s.id ? "border-slate-900" : "border-slate-200"} bg-white p-6`}>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Signal · {s.delta}</div>
                <h2 className="font-editorial text-2xl text-slate-900 mt-1">{s.title}</h2>
              </div>
              <Badge className="bg-slate-100 text-slate-700 border border-slate-200 font-mono-num text-[10px] uppercase">
                {s.affects.length} companies
              </Badge>
            </div>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed max-w-3xl">{s.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.affects.map((t) => (
                <Link key={t} to={`/company/${t}`} className="text-[11px] font-mono-num border border-slate-200 hover:border-slate-900 px-2 py-1 text-slate-700">
                  {t} →
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
