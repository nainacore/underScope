import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtLargeMoney, fmtPct, trendColor, trendArrow, fmtNum } from "@/lib/format";
import { Sparkline } from "@/components/Sparkline";
import { ArrowUpRight } from "lucide-react";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const IndexCard = ({ idx }) => (
  <div className="border border-slate-200 bg-white p-4">
    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num">{idx.region}</div>
    <div className="text-sm text-slate-700 mt-1">{idx.name}</div>
    <div className="flex items-baseline justify-between mt-2">
      <div className="font-mono-num text-lg text-slate-900">{fmtNum(idx.value)}</div>
      <div className={`font-mono-num text-sm ${trendColor(idx.change_pct)}`}>
        {trendArrow(idx.change_pct)} {fmtPct(idx.change_pct)}
      </div>
    </div>
  </div>
);

const TrendingCard = ({ c }) => (
  <Link
    to={`/company/${c.ticker}`}
    className="border border-slate-200 bg-white p-4 hover:border-slate-400 group block"
    data-testid={`trending-${c.ticker}`}
  >
    <div className="flex items-start gap-3">
      <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="font-mono-num text-[11px] text-slate-500 tracking-wider">{c.ticker} · {c.exchange}</div>
            <div className="text-sm text-slate-900 truncate">{c.name}</div>
          </div>
          <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-900" />
        </div>
      </div>
    </div>
    <div className="mt-3 flex items-baseline justify-between">
      <div className="font-mono-num text-lg text-slate-900">
        {c.currency}{fmtNum(c.price)}
      </div>
      <div className={`font-mono-num text-sm ${trendColor(c.change_pct)}`}>
        {trendArrow(c.change_pct)} {fmtPct(c.change_pct)}
      </div>
    </div>
    <div className="mt-2 flex items-center justify-between text-[11px] font-mono-num text-slate-500">
      <span>MCap {fmtLargeMoney(c.market_cap_b)}</span>
      <span>{c.sector}</span>
    </div>
    <p className="mt-3 text-[12px] text-slate-600 leading-snug line-clamp-2">{c.recent_event}</p>
  </Link>
);

const SignalCard = ({ s }) => (
  <Link
    to={`/investigations?signal=${s.id}`}
    className="border border-slate-200 bg-white p-4 hover:border-slate-400 group block"
    data-testid={`signal-${s.id}`}
  >
    <div className="flex items-start justify-between">
      <div className="text-sm text-slate-900 font-medium">{s.title}</div>
      <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-900" />
    </div>
    <div className="font-mono-num text-[11px] text-slate-500 mt-1">{s.delta}</div>
    <p className="text-[12px] text-slate-600 leading-snug mt-2">{s.summary}</p>
    <div className="mt-3 flex flex-wrap gap-1">
      {s.affects.map((t) => (
        <span key={t} className="text-[10px] font-mono-num border border-slate-200 px-1.5 py-0.5 text-slate-600">{t}</span>
      ))}
    </div>
  </Link>
);

export default function Home() {
  const [overview, setOverview] = useState(null);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    api.getMarketOverview().then(setOverview);
    api.getTrending().then((r) => setTrending(r.items || []));
  }, []);

  return (
    <div className="space-y-10 max-w-[1400px]">
      <section>
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">
          UnderScope · Financial Investigation
        </div>
        <h1 className="font-editorial text-4xl md:text-5xl mt-2 text-slate-900 leading-tight" data-testid="home-heading">
          {greeting()} — <span className="italic">what are you investigating?</span>
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 text-sm leading-relaxed">
          Search a company, topic, event or market signal. UnderScope helps you look past the price and ask{" "}
          <span className="text-slate-900 font-medium">"what am I missing?"</span>
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-editorial text-2xl text-slate-900">Market Overview</h2>
          <span className="text-[10px] font-mono-num tracking-widest uppercase text-slate-500">Demo Data · Live</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {overview?.indices?.map((idx) => <IndexCard key={idx.key} idx={idx} />)}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-editorial text-2xl text-slate-900">Trending Companies</h2>
          <Link to="/companies" className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trending.map((c) => <TrendingCard key={c.ticker} c={c} />)}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-editorial text-2xl text-slate-900">Market Signals</h2>
          <span className="text-xs text-slate-500">Themes reshaping earnings</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {overview?.signals?.map((s) => <SignalCard key={s.id} s={s} />)}
        </div>
      </section>
    </div>
  );
}
