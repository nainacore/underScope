import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const KIND_META = {
  supplier: { label: "Supplier", color: "#0F172A", ring: "#94A3B8" },
  customer: { label: "Customer", color: "#15803D", ring: "#86EFAC" },
  competitor: { label: "Competitor", color: "#B91C1C", ring: "#FCA5A5" },
  regulation: { label: "Regulation", color: "#7C3AED", ring: "#C4B5FD" },
  macro: { label: "Macro", color: "#0369A1", ring: "#7DD3FC" },
  commodity: { label: "Commodity", color: "#B45309", ring: "#FCD34D" },
  moat: { label: "Moat", color: "#0F172A", ring: "#CBD5E1" },
  technology: { label: "Technology", color: "#0F172A", ring: "#CBD5E1" },
  optionality: { label: "Optionality", color: "#B45309", ring: "#FCD34D" },
  capex: { label: "Capex", color: "#0F172A", ring: "#CBD5E1" },
};

const kindOf = (n) => KIND_META[n.kind] || { label: n.kind || "Related", color: "#0F172A", ring: "#CBD5E1" };

/**
 * Radial network map. Center = company. Nodes arranged around a circle, edges to center.
 * Fully accessible: nodes are <g role="button" tabIndex=0>.
 */
export const DependencyMap = ({ data }) => {
  const [selected, setSelected] = useState(0);
  const size = 720;
  const cx = size / 2;
  const cy = 300;
  const radius = 180;

  const nodes = data?.nodes || [];

  const placed = useMemo(() => {
    if (!nodes.length) return [];
    return nodes.map((n, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      return { ...n, x, y, angle };
    });
  }, [nodes, cx, cy, radius]);

  if (!data) return null;

  const sel = placed[selected];

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="border border-slate-200 bg-white p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Dependency network</div>
            <h3 className="font-editorial text-2xl text-slate-900 mt-1">{data.center}</h3>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] font-mono-num text-slate-500 uppercase tracking-widest">
            {Object.entries(KIND_META).slice(0, 6).map(([k, m]) => (
              <span key={k} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: m.color }} /> {m.label}</span>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${size} 600`} width="100%" className="mt-2 select-none" role="img" aria-label="Dependency network" data-testid="dependency-map-svg">
          {/* concentric guide circles */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#E2E8F0" strokeDasharray="2 3" />
          <circle cx={cx} cy={cy} r={radius * 0.6} fill="none" stroke="#F1F5F9" />

          {/* edges */}
          {placed.map((n, i) => (
            <line
              key={`e${i}`}
              x1={cx} y1={cy}
              x2={n.x} y2={n.y}
              stroke={i === selected ? "#0F172A" : "#CBD5E1"}
              strokeWidth={i === selected ? 1.6 : 1}
            />
          ))}

          {/* center node */}
          <g>
            <circle cx={cx} cy={cy} r="46" fill="#0F172A" />
            <text x={cx} y={cy - 3} textAnchor="middle" fill="white" fontSize="12" className="font-mono-num" style={{ letterSpacing: "0.06em" }}>
              {data.ticker || ""}
            </text>
            <text x={cx} y={cy + 13} textAnchor="middle" fill="#94A3B8" fontSize="9" className="font-mono-num" style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Company
            </text>
          </g>

          {/* nodes */}
          {placed.map((n, i) => {
            const meta = kindOf(n);
            const active = i === selected;
            const label = n.label.length > 22 ? n.label.slice(0, 20) + "…" : n.label;
            const labelAnchor = Math.cos(n.angle) > 0.15 ? "start" : Math.cos(n.angle) < -0.15 ? "end" : "middle";
            const lx = n.x + Math.cos(n.angle) * 18;
            const ly = n.y + Math.sin(n.angle) * 18 + (labelAnchor === "middle" ? (Math.sin(n.angle) > 0 ? 14 : -6) : 4);
            // Hit area rect covers the dot + label to make the whole node clickable.
            const labelW = Math.max(60, label.length * 6.8);
            const hitX = Math.min(n.x - 20, lx - (labelAnchor === "end" ? labelW : labelAnchor === "middle" ? labelW / 2 : 4));
            const hitRight = Math.max(n.x + 20, lx + (labelAnchor === "end" ? 4 : labelAnchor === "middle" ? labelW / 2 : labelW));
            const hitY = Math.min(n.y - 20, ly - 14);
            const hitBottom = Math.max(n.y + 20, ly + 6);
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(i); }}
                data-testid={`dep-node-${i}`}
                style={{ cursor: "pointer" }}
              >
                {/* invisible hit-area rect covering dot + label */}
                <rect
                  x={hitX}
                  y={hitY}
                  width={hitRight - hitX}
                  height={hitBottom - hitY}
                  fill="transparent"
                />
                <circle cx={n.x} cy={n.y} r={active ? 16 : 12} fill={active ? meta.color : "white"} stroke={meta.color} strokeWidth={active ? 2 : 1.6} pointerEvents="none" />
                <circle cx={n.x} cy={n.y} r={active ? 5 : 3.5} fill={active ? "white" : meta.color} pointerEvents="none" />
                <text
                  x={lx} y={ly}
                  textAnchor={labelAnchor}
                  fontSize="11"
                  fill={active ? "#0F172A" : "#334155"}
                  fontWeight={active ? 600 : 400}
                  pointerEvents="none"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="text-[11px] text-slate-500 text-center -mt-1">Click any node to inspect the relationship, impact and evidence.</p>
      </div>

      <aside className="border border-slate-200 bg-white p-6" data-testid="dep-detail-panel">
        {sel ? (
          <>
            <Badge className={`font-mono-num text-[10px] uppercase tracking-widest border bg-white`} style={{ color: kindOf(sel).color, borderColor: kindOf(sel).color }}>
              {kindOf(sel).label}
            </Badge>
            <h4 className="font-editorial text-xl text-slate-900 mt-2 leading-snug">{sel.label}</h4>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-1">Relationship</div>
                <p className="text-sm text-slate-700 leading-relaxed">{sel.relationship}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-1">Potential impact</div>
                <p className="text-sm text-slate-700 leading-relaxed">{sel.impact}</p>
              </div>
              {sel.evidence ? (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-1">Evidence</div>
                  <p className="text-xs font-mono-num text-slate-600 leading-relaxed">{sel.evidence}</p>
                </div>
              ) : null}
              {typeof sel.confidence === "number" ? (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-2">Confidence</div>
                  <div className="flex items-center gap-3">
                    <Progress value={sel.confidence} className="h-1.5" />
                    <span className="font-mono-num text-sm text-slate-900">{sel.confidence}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-500">Select a node.</p>
        )}
      </aside>
    </div>
  );
};
