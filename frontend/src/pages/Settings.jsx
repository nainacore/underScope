import React from "react";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">System</div>
        <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Settings</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">Configuration for this UnderScope preview build.</p>
      </div>

      <div className="border border-slate-200 bg-white divide-y divide-slate-100">
        {[
          ["Data source", "Realistic demo dataset (marked as such throughout the app)."],
          ["AI research analyst", "Claude Sonnet 5 via Emergent LLM key."],
          ["Watchlist persistence", "Browser LocalStorage — no account required in v1."],
          ["Authentication", "Not enabled in v1. Architecture supports future JWT / Emergent Google login."],
          ["Disclaimer", "Educational research only. Not investment advice."],
        ].map(([k, v]) => (
          <div key={k} className="grid md:grid-cols-[220px_1fr] gap-3 px-5 py-4">
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">{k}</div>
            <div className="text-sm text-slate-700">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
