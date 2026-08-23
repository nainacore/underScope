import React, { useMemo, useState } from "react";

/**
 * Interactive price chart with hover crosshair.
 * Pure SVG, no library, styled to match the institutional look.
 */
export const PriceChart = ({ data = [], width = 720, height = 260, positive = true }) => {
  const [hover, setHover] = useState(null);
  const pad = { l: 44, r: 12, t: 12, b: 22 };

  const geom = useMemo(() => {
    if (!data.length) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const w = width - pad.l - pad.r;
    const h = height - pad.t - pad.b;
    const stepX = w / (data.length - 1 || 1);
    const points = data.map((v, i) => ({
      x: pad.l + i * stepX,
      y: pad.t + (1 - (v - min) / span) * h,
      v,
    }));
    return { min, max, span, w, h, points };
  }, [data, width, height]);

  if (!geom) {
    return (
      <div className="h-[260px] grid place-items-center text-sm text-muted-foreground">
        Loading chart…
      </div>
    );
  }

  const path = geom.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${path} L${geom.points[geom.points.length - 1].x.toFixed(2)},${(pad.t + geom.h).toFixed(2)} L${geom.points[0].x.toFixed(2)},${(pad.t + geom.h).toFixed(2)} Z`;
  const stroke = positive ? "#15803D" : "#B91C1C";
  const fill = positive ? "rgba(21, 128, 61, 0.06)" : "rgba(185, 28, 28, 0.06)";

  const gridY = 4;
  const gridLines = Array.from({ length: gridY + 1 }, (_, i) => {
    const y = pad.t + (i / gridY) * geom.h;
    const val = geom.max - (i / gridY) * geom.span;
    return { y, val };
  });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - pad.l;
    const i = Math.max(0, Math.min(data.length - 1, Math.round((x / geom.w) * (data.length - 1))));
    setHover(geom.points[i] || null);
  };

  return (
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
      {/* Y-axis grid lines and labels */}
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={pad.l} x2={width - pad.r} y1={g.y} y2={g.y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray={i === gridLines.length - 1 ? "0" : "2 3"} />
          <text x={pad.l - 8} y={g.y + 3} textAnchor="end" fontSize="10" fill="#64748B" className="font-mono-num">
            {g.val.toFixed(1)}
          </text>
        </g>
      ))}

      <path d={areaPath} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.6" />

      {hover && (
        <g>
          <line x1={hover.x} x2={hover.x} y1={pad.t} y2={pad.t + geom.h} stroke="#0F172A" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx={hover.x} cy={hover.y} r="3" fill={stroke} stroke="white" strokeWidth="1.5" />
          <g>
            <rect x={Math.min(width - 90, hover.x + 8)} y={pad.t + 2} width="82" height="22" fill="white" stroke="#E2E8F0" />
            <text x={Math.min(width - 90, hover.x + 8) + 8} y={pad.t + 17} fontSize="11" className="font-mono-num" fill="#0F172A">
              {hover.v.toFixed(2)}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};
