import React from "react";

/**
 * Lightweight sparkline (no dependencies). Takes an array of numbers.
 */
export const Sparkline = ({ data = [], width = 120, height = 36, color, positive }) => {
  if (!data.length) return <svg width={width} height={height} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => `${(i * stepX).toFixed(2)},${(height - ((v - min) / span) * height).toFixed(2)}`).join(" ");
  const stroke = color || (positive ? "#15803D" : "#B91C1C");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={points} />
    </svg>
  );
};
