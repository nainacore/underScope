import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const scenarios = [
  { id: "rates", label: "Fed rate change (bps)", min: -200, max: 200, step: 25, default: 0, affects: "Banks, growth equities, USD flows" },
  { id: "oil", label: "Crude oil price ($/bbl)", min: 40, max: 130, step: 1, default: 71, affects: "Energy, materials, downstream margins" },
  { id: "usdinr", label: "USD/INR", min: 78, max: 92, step: 0.25, default: 84.6, affects: "Indian IT exporters, importers" },
  { id: "aicapex", label: "AI capex growth (%)", min: -30, max: 60, step: 1, default: 40, affects: "NVIDIA, hyperscalers, semiconductor supply chain" },
];

export default function ScenarioLab() {
  const [companies, setCompanies] = useState([]);
  const [values, setValues] = useState(Object.fromEntries(scenarios.map((s) => [s.id, s.default])));

  useEffect(() => { api.listCompanies().then((r) => setCompanies(r.items || [])); }, []);

  const impact = () => {
    const arr = [];
    // Simple deterministic sensitivity model for demo
    if (values.aicapex >= 40) arr.push({ t: "NVDA", pos: true, note: `AI capex above ${values.aicapex}% supports data-center growth.` });
    if (values.aicapex < 15) arr.push({ t: "NVDA", pos: false, note: `AI capex below ${values.aicapex}% would reset consensus revenue trajectory.` });
    if (values.rates > 50) arr.push({ t: "JPM", pos: true, note: "Higher rates modestly support NII on floating-rate books." });
    if (values.rates > 100) arr.push({ t: "TSLA", pos: false, note: "Higher rates elongate enterprise & consumer auto decision cycles." });
    if (values.oil > 90) arr.push({ t: "RELIANCE", pos: true, note: "Higher crude improves O2C realisations." });
    if (values.oil < 60) arr.push({ t: "MCD", pos: true, note: "Lower input costs help QSR margin recovery." });
    if (values.usdinr > 86) arr.push({ t: "TCS", pos: true, note: "Weaker rupee mechanically supports INR revenue translation." });
    if (values.usdinr < 82) arr.push({ t: "TCS", pos: false, note: "Stronger rupee compresses INR revenue growth." });
    return arr;
  };

  const affected = impact();

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-[1400px]">
      <div className="space-y-6">
        <div>
          <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Sandbox</div>
          <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">Scenario Lab</h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Change macro assumptions and see which companies could be second-order affected.
            Not a price prediction.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 space-y-8">
          {scenarios.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm text-slate-900">{s.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.affects}</div>
                </div>
                <span className="font-mono-num text-lg text-slate-900">{values[s.id]}</span>
              </div>
              <Slider
                value={[values[s.id]]}
                onValueChange={(v) => setValues((prev) => ({ ...prev, [s.id]: v[0] }))}
                min={s.min} max={s.max} step={s.step}
                data-testid={`slider-${s.id}`}
              />
              <div className="flex justify-between text-[10px] font-mono-num text-slate-500 mt-1">
                <span>{s.min}</span><span>{s.max}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setValues(Object.fromEntries(scenarios.map((s) => [s.id, s.default])))} data-testid="scenario-reset">
              Reset to base case
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-slate-200 bg-white p-6">
          <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Ripple effects</div>
          <h3 className="font-editorial text-xl text-slate-900 mt-1">Companies likely affected</h3>
          <div className="mt-4 space-y-3">
            {affected.length === 0 && <p className="text-sm text-slate-500">Current assumptions are near the base case. Move a slider to explore ripple effects.</p>}
            {affected.map((a, i) => (
              <div key={i} className="border-l-2 pl-3" style={{ borderColor: a.pos ? "#15803D" : "#B91C1C" }}>
                <div className="text-[11px] font-mono-num text-slate-500 tracking-widest uppercase">{a.pos ? "Positive" : "Negative"} · {a.t}</div>
                <div className="text-[13px] text-slate-800 mt-1 leading-relaxed">{a.note}</div>
              </div>
            ))}
          </div>
          <Badge className="mt-5 bg-amber-50 text-amber-700 border border-amber-200 font-mono-num text-[10px] uppercase">Scenario Assumption</Badge>
        </div>
      </div>
    </div>
  );
}
