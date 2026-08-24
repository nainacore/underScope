import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const NODE_META = {
  root: { color: "#0F172A", label: "Trigger" },
  primary: { color: "#0369A1", label: "1st-order effect" },
  market: { color: "#B45309", label: "Market impact" },
};

/**
 * Horizontal 3-tier causal tree. Clickable nodes reveal detail and affected tickers.
 * Levels: root (trigger) -> primary (1st-order) -> market (visible market impact).
 */
export const RippleGraph = ({ ripple }) => {
  const [selectedKey, setSelectedKey] = useState("root");

  const layout = useMemo(() => {
    if (!ripple?.tree) return null;
    const width = 900;
    const heightPerLeaf = 76;
    // count leaves (market-level nodes) to compute layout height
    const primaries = ripple.tree.children || [];
    let totalLeaves = 0;
    primaries.forEach((p) => { totalLeaves += Math.max(1, (p.children || []).length); });
    const height = Math.max(360, totalLeaves * heightPerLeaf + 40);
    const colX = { root: 90, primary: width * 0.42, market: width * 0.82 };

    const nodes = [];
    const edges = [];
    // root
    const rootId = "root";
    nodes.push({ id: rootId, level: "root", x: colX.root, y: height / 2, data: ripple.tree, key: "root" });

    let yCursor = 24;
    primaries.forEach((p, pi) => {
      const leaves = p.children || [];
      const cnt = Math.max(1, leaves.length);
      const clusterHeight = cnt * heightPerLeaf;
      const pMidY = yCursor + clusterHeight / 2;
      const pKey = `0.${pi}`;
      nodes.push({ id: `p-${pi}`, level: "primary", x: colX.primary, y: pMidY, data: p, key: pKey });
      edges.push({ from: rootId, to: `p-${pi}`, key: pKey });

      leaves.forEach((leaf, li) => {
        const y = yCursor + li * heightPerLeaf + heightPerLeaf / 2;
        const lKey = `0.${pi}.${li}`;
        nodes.push({ id: `l-${pi}-${li}`, level: "market", x: colX.market, y, data: leaf, key: lKey });
        edges.push({ from: `p-${pi}`, to: `l-${pi}-${li}`, key: lKey });
      });
      yCursor += clusterHeight;
    });

    return { width, height, nodes, edges };
  }, [ripple]);

  if (!ripple || !layout) return null;

  const nodeMap = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));
  const selected = layout.nodes.find((n) => n.key === selectedKey) || layout.nodes[0];

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="border border-slate-200 bg-white p-4 overflow-x-auto">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Causal path</div>
            <h3 className="font-editorial text-2xl text-slate-900">{ripple.title}</h3>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono-num text-slate-500 uppercase tracking-widest">
            {Object.entries(NODE_META).map(([k, m]) => (
              <span key={k} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: m.color }} /> {m.label}</span>
            ))}
          </div>
        </div>
        <svg viewBox={`0 0 ${layout.width} ${layout.height}`} width="100%" className="min-w-[720px]" role="img" aria-label="Ripple causal graph" data-testid="ripple-graph-svg">
          {/* edges */}
          {layout.edges.map((e, i) => {
            const a = nodeMap[e.from];
            const b = nodeMap[e.to];
            if (!a || !b) return null;
            const dx = b.x - a.x;
            const midX = a.x + dx / 2;
            const active = selected && (selected.key === e.key || selected.key.startsWith(e.key));
            const path = `M ${a.x + 32} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x - 32} ${b.y}`;
            return <path key={i} d={path} fill="none" stroke={active ? "#0F172A" : "#CBD5E1"} strokeWidth={active ? 1.6 : 1} />;
          })}
          {/* nodes */}
          {layout.nodes.map((n) => {
            const meta = NODE_META[n.level];
            const active = selected && selected.id === n.id;
            const w = n.level === "market" ? 230 : n.level === "primary" ? 210 : 140;
            const h = n.level === "market" ? 52 : 44;
            const rx = 4;
            const label = n.data.label || "";
            // wrap long labels onto 2 lines for market nodes
            const wrap = (s, max) => {
              if (s.length <= max) return [s];
              const words = s.split(" ");
              const lines = ["", ""];
              let li = 0;
              for (const w of words) {
                const candidate = lines[li] ? lines[li] + " " + w : w;
                if (candidate.length > max && li === 0) { li = 1; lines[li] = w; }
                else lines[li] = candidate;
              }
              return lines.filter(Boolean);
            };
            const lines = n.level === "market" ? wrap(label, 26) : [label.length > 30 ? label.slice(0, 28) + "…" : label];
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedKey(n.key)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedKey(n.key); }}
                style={{ cursor: "pointer" }}
                data-testid={`ripple-node-${n.key}`}
              >
                <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={rx} fill={active ? meta.color : "white"} stroke={meta.color} strokeWidth={active ? 2 : 1.2} />
                {lines.map((ln, li) => (
                  <text
                    key={li}
                    x={n.x}
                    y={n.y + (lines.length === 1 ? 4 : li === 0 ? -3 : 12)}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight={active ? 600 : 500}
                    fill={active ? "white" : "#0F172A"}
                    pointerEvents="none"
                  >
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
        <p className="text-[11px] text-slate-500 text-center mt-1">Click any node to inspect the causal step and affected companies.</p>
      </div>

      <aside className="border border-slate-200 bg-white p-6" data-testid="ripple-detail-panel">
        <Badge className="font-mono-num text-[10px] uppercase tracking-widest border bg-white"
          style={{ color: NODE_META[selected.level].color, borderColor: NODE_META[selected.level].color }}>
          {NODE_META[selected.level].label}
        </Badge>
        <h4 className="font-editorial text-xl text-slate-900 mt-2 leading-snug">{selected.data.label}</h4>
        <div className="mt-4 space-y-4">
          {selected.data.note ? (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-1">What this means</div>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.data.note}</p>
            </div>
          ) : null}
          {selected.data.affects?.length ? (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num mb-2">Companies affected</div>
              <div className="flex flex-wrap gap-2">
                {selected.data.affects.map((t) => (
                  <Link
                    key={t}
                    to={`/company/${t}`}
                    className="text-[11px] font-mono-num border border-slate-200 hover:border-slate-900 px-2 py-1 text-slate-700"
                    data-testid={`ripple-affects-${t}`}
                  >
                    {t} →
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-6 border-t border-slate-200 pt-3">
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-mono-num text-[10px] tracking-widest uppercase">Scenario Assumption</Badge>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Directional causal chain based on historical relationships. Not a price prediction.
          </p>
        </div>
      </aside>
    </div>
  );
};
