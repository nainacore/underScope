import React from "react";

export const CompanyLogo = ({ ticker, name, bg = "#0F172A", size = 36 }) => {
  const initials = (ticker || name || "?").slice(0, 2).toUpperCase();
  return (
    <div
      className="grid place-items-center rounded font-mono-num font-semibold text-white shrink-0"
      style={{ backgroundColor: bg, width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-label={`${name || ticker} logo`}
    >
      {initials}
    </div>
  );
};
