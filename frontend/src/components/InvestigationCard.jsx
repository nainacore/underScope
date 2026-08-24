import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TYPE_META = {
  verified_fact: { label: "Verified Fact", cls: "bg-slate-100 text-slate-700 border-slate-300" },
  reported_event: { label: "Reported Event", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  ai_interpretation: { label: "AI Interpretation", cls: "bg-purple-50 text-purple-700 border-purple-200" },
  scenario_assumption: { label: "Scenario Assumption", cls: "bg-amber-50 text-amber-700 border-amber-200" },
};

const IMPACT_META = {
  High: "text-red-700 border-red-300",
  Medium: "text-amber-700 border-amber-300",
  Low: "text-slate-600 border-slate-300",
};

export const InvestigationCard = ({ card, index }) => {
  const meta = TYPE_META[card.type] || TYPE_META.ai_interpretation;
  const impactCls = IMPACT_META[card.impact] || IMPACT_META.Low;
  return (
    <article
      className="bg-white border border-slate-200 hover:border-slate-400 transition-colors"
      data-testid={`investigation-card-${index}`}
    >
      <header className="p-5 border-b border-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[11px] tracking-widest uppercase text-slate-500 font-mono-num">
                #{String(index + 1).padStart(2, "0")} · {card.category}
              </span>
              <span className="text-slate-300">·</span>
              <span className={`text-[10px] tracking-widest uppercase font-mono-num border px-1.5 py-0.5 ${impactCls}`}>
                Impact: {card.impact || "Low"}
              </span>
            </div>
            <h3 className="font-editorial text-xl md:text-[22px] text-slate-900 leading-snug">
              {card.finding}
            </h3>
          </div>
          <Badge className={`shrink-0 border ${meta.cls} font-mono-num text-[10px] tracking-widest uppercase`}>
            {meta.label}
          </Badge>
        </div>
      </header>

      <div className="p-5 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1 font-mono-num">Why it matters</div>
            <p className="text-sm text-slate-700 leading-relaxed">{card.why}</p>
          </div>
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1 font-mono-num">Evidence</div>
            <p className="text-sm text-slate-700 leading-relaxed">{card.evidence}</p>
          </div>
          {card.chain?.length ? (
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2 font-mono-num">Potential chain</div>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] text-slate-700">
                {card.chain.map((step, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="border border-slate-200 bg-slate-50 px-2 py-1 leading-none">
                      <span className="font-mono-num text-[10px] text-slate-500 mr-1">{i + 1}</span>{step}
                    </span>
                    {i < card.chain.length - 1 && <span className="text-slate-300 font-mono-num">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {card.sources?.length ? (
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1 font-mono-num">Sources</div>
              <ul className="text-xs font-mono-num text-slate-600 space-y-1">
                {card.sources.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-slate-400">▸</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 border-l border-slate-200 pl-6">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2 font-mono-num">Confidence</div>
            <div className="flex items-center gap-3">
              <Progress value={card.confidence} className="h-1.5" />
              <span className="font-mono-num text-sm text-slate-900">{card.confidence}</span>
            </div>
          </div>
          {card.metrics?.length ? (
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2 font-mono-num">Supporting metrics</div>
              <div className="space-y-2">
                {card.metrics.map((m, i) => (
                  <div key={i} className="flex items-baseline justify-between border-b border-dashed border-slate-200 pb-1">
                    <span className="text-xs text-slate-600">{m.label}</span>
                    <span className="font-mono-num text-sm text-slate-900">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};
