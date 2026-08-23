import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TYPE_META = {
  verified_fact: { label: "Verified Fact", cls: "bg-slate-100 text-slate-700 border-slate-200" },
  reported_event: { label: "Reported Event", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  ai_interpretation: { label: "AI Interpretation", cls: "bg-purple-50 text-purple-700 border-purple-200" },
  scenario_assumption: { label: "Scenario Assumption", cls: "bg-amber-50 text-amber-700 border-amber-200" },
};

export const InvestigationCard = ({ card, index }) => {
  const meta = TYPE_META[card.type] || TYPE_META.ai_interpretation;
  return (
    <article
      className="bg-white border border-slate-200 hover:border-slate-400 transition-colors"
      data-testid={`investigation-card-${index}`}
    >
      <header className="p-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] tracking-widest uppercase text-slate-500 font-mono-num">
              #{String(index + 1).padStart(2, "0")} · {card.category}
            </span>
          </div>
          <h3 className="font-editorial text-xl text-slate-900 leading-snug">
            {card.finding}
          </h3>
        </div>
        <Badge className={`shrink-0 border ${meta.cls} font-mono-num text-[10px] tracking-widest uppercase`}>
          {meta.label}
        </Badge>
      </header>

      <div className="p-5 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">Why it matters</div>
            <p className="text-sm text-slate-700 leading-relaxed">{card.why}</p>
          </div>
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">Evidence</div>
            <p className="text-sm text-slate-700 leading-relaxed">{card.evidence}</p>
          </div>
          {card.sources?.length ? (
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">Sources</div>
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
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2">Confidence</div>
            <div className="flex items-center gap-3">
              <Progress value={card.confidence} className="h-1.5" />
              <span className="font-mono-num text-sm text-slate-900">{card.confidence}</span>
            </div>
          </div>
          {card.metrics?.length ? (
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2">Supporting Metrics</div>
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
