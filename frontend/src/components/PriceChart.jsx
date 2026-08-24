import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

const RANGES = ["1D", "1W", "1M", "6M", "1Y", "5Y"];

const fmtLabel = (isoT, range) => {
  const d = new Date(isoT);
  if (range === "1D") return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (range === "5Y") return d.toLocaleDateString([], { month: "short", year: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

const fmtTooltipDate = (isoT, range) => {
  const d = new Date(isoT);
  if (range === "1D") return d.toLocaleString([], { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" });
  return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
};

const IMPORTANCE_COLOR = { high: "#B45309", medium: "#0369A1", low: "#64748B" };

export const PriceChart = ({ ticker, currency = "$" }) => {
  const [range, setRange] = useState("1Y");
  const [data, setData] = useState({ points: [], events: [] });
  const [hover, setHover] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const width = 900;
  const height = 300;
  const pad = { l: 56, r: 20, t: 18, b: 34 };

  useEffect(() => {
    let alive = true;
    setSelectedEvent(null);
    setHover(null);
    api.getPriceHistory(ticker, range).then((r) => {
      if (alive) setData({ points: r.points || [], events: r.events || [] });
    });
    return () => { alive = false; };
  }, [ticker, range]);

  const geom = useMemo(() => {
    if (!data.points.length) return null;
    const values = data.points.map((p) => p.v);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const w = width - pad.l - pad.r;
    const h = height - pad.t - pad.b;
    const stepX = w / (data.points.length - 1 || 1);
    const points = data.points.map((p, i) => ({
      x: pad.l + i * stepX,
      y: pad.t + (1 - (p.v - min) / span) * h,
      v: p.v,
      t: p.t,
    }));
    return { min, max, span, w, h, points };
  }, [data]);

  if (!geom) {
    return <div className="h-[300px] grid place-items-center text-sm text-muted-foreground">Loading chart…</div>;
  }

  const path = geom.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${path} L${geom.points.at(-1).x.toFixed(2)},${(pad.t + geom.h).toFixed(2)} L${geom.points[0].x.toFixed(2)},${(pad.t + geom.h).toFixed(2)} Z`;
  const positive = geom.points.at(-1).v >= geom.points[0].v;
  const stroke = positive ? "#15803D" : "#B91C1C";
  const fill = positive ? "rgba(21, 128, 61, 0.06)" : "rgba(185, 28, 28, 0.06)";

  const gridY = 4;
  const gridLines = Array.from({ length: gridY + 1 }, (_, i) => {
    const y = pad.t + (i / gridY) * geom.h;
    const val = geom.max - (i / gridY) * geom.span;
    return { y, val };
  });

  const xTicks = 5;
  const xLabels = Array.from({ length: xTicks + 1 }, (_, i) => {
    const idx = Math.round((i / xTicks) * (geom.points.length - 1));
    return geom.points[idx];
  });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const relX = svgX - pad.l;
    const i = Math.max(0, Math.min(geom.points.length - 1, Math.round((relX / geom.w) * (geom.points.length - 1))));
    setHover(geom.points[i] || null);
  };

  // Map events onto x positions
  const eventPoints = data.events
    .map((e) => {
      const idx = geom.points.findIndex((p) => p.t.startsWith(e.date));
      if (idx < 0) return null;
      return { ...e, x: geom.points[idx].x, y: geom.points[idx].y };
    })
    .filter(Boolean);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">
          {range} price · {data.points.length} points · simulated
        </div>
        <div className="flex border border-slate-200 divide-x divide-slate-200" role="tablist" aria-label="Price range">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-mono-num tracking-wider ${range === r ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`}
              data-testid={`range-${r}`}
              aria-pressed={range === r}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <svg
        role="img"
        aria-label="Price chart"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="select-none"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        data-testid="price-chart"
      >
        {gridLines.map((g, i) => (
          <g key={i}>
            <line x1={pad.l} x2={width - pad.r} y1={g.y} y2={g.y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray={i === gridLines.length - 1 ? "0" : "2 3"} />
            <text x={pad.l - 8} y={g.y + 3} textAnchor="end" fontSize="10" fill="#64748B" className="font-mono-num">
              {currency}{g.val.toFixed(2)}
            </text>
          </g>
        ))}

        {xLabels.map((p, i) => (
          <text key={i} x={p.x} y={height - pad.b + 18} textAnchor="middle" fontSize="10" fill="#64748B" className="font-mono-num">
            {fmtLabel(p.t, range)}
          </text>
        ))}

        <path d={areaPath} fill={fill} />
        <path d={path} fill="none" stroke={stroke} strokeWidth="1.6" />

        {eventPoints.map((e, i) => (
          <g key={i} onClick={() => setSelectedEvent(e)} style={{ cursor: "pointer" }} data-testid={`event-marker-${i}`}>
            <line x1={e.x} x2={e.x} y1={pad.t} y2={pad.t + geom.h} stroke={IMPORTANCE_COLOR[e.importance] || "#64748B"} strokeDasharray="2 3" opacity="0.4" />
            <circle cx={e.x} cy={pad.t + 4} r="4" fill="white" stroke={IMPORTANCE_COLOR[e.importance] || "#64748B"} strokeWidth="1.6" />
            <text x={e.x} y={pad.t + 2} textAnchor="middle" fontSize="7" fill={IMPORTANCE_COLOR[e.importance] || "#64748B"} className="font-mono-num" fontWeight={600}>E</text>
          </g>
        ))}

        {hover && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={pad.t} y2={pad.t + geom.h} stroke="#0F172A" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx={hover.x} cy={hover.y} r="3.5" fill={stroke} stroke="white" strokeWidth="1.5" />
            <g>
              <rect x={Math.min(width - 170, hover.x + 10)} y={pad.t + 2} width="160" height="42" fill="white" stroke="#E2E8F0" />
              <text x={Math.min(width - 170, hover.x + 10) + 10} y={pad.t + 18} fontSize="11" className="font-mono-num" fill="#0F172A">
                {currency}{hover.v.toFixed(2)}
              </text>
              <text x={Math.min(width - 170, hover.x + 10) + 10} y={pad.t + 34} fontSize="10" className="font-mono-num" fill="#64748B">
                {fmtTooltipDate(hover.t, range)}
              </text>
            </g>
          </g>
        )}
      </svg>

      {selectedEvent && (
        <div className="border border-slate-200 bg-white p-3 text-sm flex items-start gap-3" data-testid="event-detail">
          <div className="w-2 h-2 rounded-full mt-2" style={{ background: IMPORTANCE_COLOR[selectedEvent.importance] || "#64748B" }} />
          <div className="flex-1">
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">
              {selectedEvent.date} · {selectedEvent.type} · {selectedEvent.importance}
            </div>
            <div className="text-slate-900 mt-1">{selectedEvent.title}</div>
          </div>
          <button className="text-slate-400 hover:text-slate-900 text-xs" onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};
