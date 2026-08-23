export const fmtMoney = (v, currency = "$", digits = 2) => {
  if (v == null || Number.isNaN(v)) return "—";
  const n = Number(v);
  return `${currency}${n.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
};

export const fmtLargeMoney = (v, currency = "$") => {
  if (v == null) return "—";
  const n = Number(v);
  if (Math.abs(n) >= 1000) return `${currency}${(n / 1000).toFixed(2)}T`;
  return `${currency}${n.toFixed(1)}B`;
};

export const fmtPct = (v, digits = 2) => {
  if (v == null) return "—";
  const n = Number(v);
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
};

export const fmtNum = (v, digits = 2) => {
  if (v == null) return "—";
  return Number(v).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
};

export const trendColor = (v) => (Number(v) >= 0 ? "text-emerald-700" : "text-red-700");
export const trendBg = (v) => (Number(v) >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200");
export const trendArrow = (v) => (Number(v) >= 0 ? "↑" : "↓");
