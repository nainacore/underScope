import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { CompanyLogo } from "@/components/CompanyLogo";
import { fmtLargeMoney, fmtNum, fmtPct, trendArrow, trendColor } from "@/lib/format";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PriceChart } from "@/components/PriceChart";
import { InvestigationCard } from "@/components/InvestigationCard";
import { DependencyMap } from "@/components/DependencyMap";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Star, Sparkles, Building, Users, Calendar as CalendarIcon } from "lucide-react";

const StatBlock = ({ label, value, sub }) => (
  <div className="border-b border-slate-200 py-3">
    <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">{label}</div>
    <div className="font-mono-num text-lg text-slate-900 mt-0.5">{value}</div>
    {sub ? <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div> : null}
  </div>
);

const MiniBarChart = ({ labels, series, height = 140 }) => {
  const max = Math.max(...series.map(Math.abs));
  return (
    <div className="flex items-end gap-2 h-[140px] mt-3" style={{ height }}>
      {series.map((v, i) => {
        const h = (Math.abs(v) / (max || 1)) * (height - 24);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[10px] font-mono-num text-slate-500">{v}</div>
            <div className="w-full bg-slate-900" style={{ height: h }} />
            <div className="text-[10px] font-mono-num text-slate-500">{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
};

const ScenarioTab = ({ ticker, company }) => {
  const [aiSpend, setAi] = useState([10]);
  const [dcGrowth, setDc] = useState([15]);
  const [gm, setGm] = useState([72]);

  const revImpact = (aiSpend[0] * 1.2 + dcGrowth[0] * 0.9) / 2; // demo formula
  const marginImpact = (gm[0] - 68) * 1.4;
  const businessImpact = Math.abs(revImpact) > 25 || Math.abs(marginImpact) > 8 ? "High" : Math.abs(revImpact) > 10 ? "Medium" : "Low";

  const preset = (name) => {
    if (name === "bull") { setAi([25]); setDc([30]); setGm([78]); }
    else if (name === "bear") { setAi([-15]); setDc([-5]); setGm([62]); }
    else { setAi([10]); setDc([15]); setGm([72]); }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-6 border border-slate-200 bg-white p-6">
        <div>
          <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Assumptions</div>
          <h3 className="font-editorial text-2xl text-slate-900 mt-1">{company.name} scenario</h3>
        </div>
        <div className="flex gap-2">
          {[["base","Base"],["bull","Bull"],["bear","Bear"]].map(([k,l]) => (
            <button key={k} onClick={() => preset(k)} className="text-xs px-3 py-1.5 border border-slate-200 hover:border-slate-900" data-testid={`scenario-${k}`}>{l} case</button>
          ))}
        </div>
        <div className="space-y-6">
          {[
            { label: "AI infrastructure spending growth", value: aiSpend, set: setAi, min: -20, max: 30, step: 1, unit: "%" },
            { label: "Data-center revenue growth", value: dcGrowth, set: setDc, min: -10, max: 40, step: 1, unit: "%" },
            { label: "Gross margin", value: gm, set: setGm, min: 55, max: 80, step: 1, unit: "%" },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-700">{s.label}</label>
                <span className="font-mono-num text-sm text-slate-900">{s.value[0]}{s.unit}</span>
              </div>
              <Slider value={s.value} onValueChange={s.set} min={s.min} max={s.max} step={s.step} data-testid={`scenario-slider-${i}`} />
              <div className="flex justify-between text-[10px] font-mono-num text-slate-500 mt-1">
                <span>{s.min}{s.unit}</span><span>{s.max}{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-slate-200 bg-white p-6 space-y-5">
        <div>
          <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Sensitivity output</div>
          <h3 className="font-editorial text-xl text-slate-900 mt-1">Business impact</h3>
        </div>
        <StatBlock label="Revenue direction" value={`${revImpact >= 0 ? "↑" : "↓"} ${Math.abs(revImpact).toFixed(1)}%`} />
        <StatBlock label="Margin direction" value={`${marginImpact >= 0 ? "↑" : "↓"} ${Math.abs(marginImpact).toFixed(1)} pts`} />
        <StatBlock label="Business impact" value={businessImpact} />
        <div className="border-t border-slate-200 pt-3">
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-mono-num text-[10px] tracking-widest uppercase">Scenario Assumption</Badge>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Scenario analysis based on user assumptions. Not a price prediction or investment recommendation.
          </p>
        </div>
      </div>
    </div>
  );
};

const DependenciesTab = ({ deps }) => {
  if (!deps) return null;
  return <DependencyMap data={deps} />;
};

const FinancialsTab = ({ fin }) => {
  if (!fin) return null;
  const y = fin.years;
  const is = fin.income_statement;
  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-editorial text-2xl text-slate-900">Income Statement</h3>
          <span className="text-[10px] font-mono-num text-slate-500 uppercase tracking-widest">Annual · {fin.currency}Bn</span>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-[10px] uppercase tracking-widest text-slate-500 font-mono-num">
            <th className="text-left py-2">Metric</th>
            {y.map((yr) => <th key={yr} className="text-right py-2">{yr}</th>)}
          </tr></thead>
          <tbody>
            {[
              ["Revenue", is.revenue],
              ["Gross profit", is.gross_profit],
              ["Operating income", is.operating_income],
              ["Net income", is.net_income],
              ["EPS", is.eps],
            ].map(([label, arr]) => (
              <tr key={label} className="border-t border-slate-100">
                <td className="py-2 text-slate-700">{label}</td>
                {arr.map((v, i) => <td key={i} className="py-2 text-right font-mono-num text-slate-900">{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <MiniBarChart labels={y} series={is.revenue} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-slate-200 bg-white p-6">
          <h3 className="font-editorial text-xl text-slate-900 mb-3">Balance Sheet</h3>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(fin.balance_sheet).map(([k, arr]) => (
                <tr key={k} className="border-t border-slate-100">
                  <td className="py-2 text-slate-700 capitalize">{k}</td>
                  {arr.map((v, i) => <td key={i} className="py-2 text-right font-mono-num text-slate-900">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border border-slate-200 bg-white p-6">
          <h3 className="font-editorial text-xl text-slate-900 mb-3">Cash Flow</h3>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(fin.cash_flow).map(([k, arr]) => (
                <tr key={k} className="border-t border-slate-100">
                  <td className="py-2 text-slate-700 capitalize">{k.replace("_", " ")}</td>
                  {arr.map((v, i) => <td key={i} className="py-2 text-right font-mono-num text-slate-900">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NewsTab = ({ news }) => (
  <div className="space-y-3">
    {news.length === 0 && <div className="text-sm text-slate-500 border border-slate-200 bg-white p-6">No recent items in the demo dataset for this company.</div>}
    {news.map((n, i) => (
      <article key={i} className="border border-slate-200 bg-white p-5 hover:border-slate-400">
        <div className="flex items-center justify-between text-[10px] font-mono-num text-slate-500 tracking-widest uppercase">
          <span>{n.date} · {n.source}</span>
          <span>{n.topic}</span>
        </div>
        <h3 className="font-editorial text-xl text-slate-900 mt-1">{n.title}</h3>
        <p className="text-sm text-slate-700 mt-2 leading-relaxed">{n.summary}</p>
      </article>
    ))}
  </div>
);

const EventsTab = ({ events }) => (
  <div className="border-l-2 border-slate-900 pl-6 space-y-6">
    {events.length === 0 && <div className="text-sm text-slate-500">No timeline entries yet.</div>}
    {events.map((e, i) => (
      <div key={i} className="relative">
        <div className="absolute -left-[29px] top-1 w-3 h-3 border-2 border-slate-900 bg-white" />
        <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">{e.date} · {e.type} · {e.importance}</div>
        <div className="text-sm text-slate-900 mt-1">{e.title}</div>
      </div>
    ))}
  </div>
);

const WhyMoved = ({ company }) => {
  const isDown = company.change_pct < 0;
  return (
    <div className="border border-slate-200 bg-white p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Event analysis</div>
          <h3 className="font-editorial text-2xl text-slate-900 mt-1">Why did {company.ticker} move {isDown ? "down" : "up"} {fmtPct(company.change_pct)}?</h3>
        </div>
      </div>
      <div className="mt-5 grid md:grid-cols-3 gap-3">
        {[
          { label: "Sector rotation", conf: "Medium", note: `Broad ${company.sector} moves accounted for part of today's move.` },
          { label: "Company-specific", conf: "High", note: company.recent_event },
          { label: "Macro backdrop", conf: "Low", note: "Rates, FX and commodities remain the second-order drivers." },
        ].map((d, i) => (
          <div key={i} className="border border-slate-200 p-4">
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Driver · {d.conf} confidence</div>
            <div className="text-sm text-slate-900 mt-1 font-medium">{d.label}</div>
            <p className="text-[12px] text-slate-600 leading-relaxed mt-2">{d.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Company() {
  const { ticker } = useParams();
  const [c, setC] = useState(null);
  const [ph, setPh] = useState([]);
  const [inv, setInv] = useState([]);
  const [fin, setFin] = useState(null);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [deps, setDeps] = useState(null);
  const { has, toggle } = useWatchlist();

  useEffect(() => {
    let alive = true;
    setC(null);
    Promise.all([
      api.getCompany(ticker),
      api.getPriceHistory(ticker),
      api.getInvestigations(ticker),
      api.getFinancials(ticker),
      api.getNews(ticker),
      api.getEvents(ticker),
      api.getDependencies(ticker),
    ]).then(([co, p, i, f, n, e, d]) => {
      if (!alive) return;
      setC(co.company); setPh(p.series || []); setInv(i.items || []);
      setFin(f.financials); setNews(n.items || []); setEvents(e.items || []); setDeps(d.dependency_map);
    });
    return () => { alive = false; };
  }, [ticker]);

  if (!c) return <div className="text-sm text-slate-500">Loading…</div>;
  const positive = c.change_pct >= 0;

  const watched = has(c.ticker);

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("underscope:open-assistant", { detail: { ticker: c.ticker, name: c.name } }));
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <header className="border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <CompanyLogo ticker={c.ticker} name={c.name} bg={c.logo_bg} size={56} />
            <div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">{c.ticker} · {c.exchange} · {c.sector}</div>
              <h1 className="font-editorial text-3xl md:text-4xl text-slate-900 mt-1">{c.name}</h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">{c.snapshot}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-mono-num text-slate-500">
                <span className="flex items-center gap-1"><Building size={12} /> {c.hq}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {fmtNum(c.employees, 0)} employees</span>
                <span className="flex items-center gap-1"><CalendarIcon size={12} /> Founded {c.founded}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="font-mono-num text-3xl text-slate-900">{c.currency}{fmtNum(c.price)}</div>
            <div className={`font-mono-num text-sm ${trendColor(c.change_pct)}`}>{trendArrow(c.change_pct)} {fmtNum(c.change_abs)} ({fmtPct(c.change_pct)})</div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => toggle(c.ticker)} data-testid="watchlist-toggle">
                <Star size={14} className={`mr-1 ${watched ? "fill-slate-900" : ""}`} /> {watched ? "Watching" : "Watch"}
              </Button>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white" onClick={openAssistant} data-testid="ask-analyst">
                <Sparkles size={14} className="mr-1" /> Ask Analyst
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 mt-6 border-t border-slate-200 pt-4">
          <StatBlock label="Market cap" value={fmtLargeMoney(c.market_cap_b)} />
          <StatBlock label="P/E (TTM)" value={fmtNum(c.pe, 1)} />
          <StatBlock label="Revenue growth" value={fmtPct(c.revenue_growth_pct, 1)} />
          <StatBlock label="EPS (TTM)" value={fmtNum(c.eps_ttm)} />
        </div>
      </header>

      <div className="border border-slate-200 bg-white p-4">
        <PriceChart data={ph} positive={positive} />
        <div className="text-[10px] font-mono-num text-slate-500 mt-2 text-right uppercase tracking-widest">120-day series · demo</div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border border-slate-200 rounded-none p-0 flex flex-wrap gap-0 h-auto">
          {[
            ["overview","Overview"],["investigation","Investigation"],["financials","Financials"],
            ["news","News"],["events","Events"],["dependencies","Dependencies"],
            ["scenarios","Scenarios"],["research","Research"],
          ].map(([v,l]) => (
            <TabsTrigger key={v} value={v} className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-slate-50 data-[state=active]:shadow-none px-4 py-2 text-sm" data-testid={`tab-${v}`}>{l}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <WhyMoved company={c} />
          <section>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Signature</div>
            <h2 className="font-editorial text-2xl text-slate-900 mt-1">UnderScope Investigation</h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">What might the market be missing?</p>
            <div className="grid gap-4 mt-4">
              {inv.slice(0, 2).map((card, i) => <InvestigationCard key={i} card={card} index={i} />)}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="investigation" className="mt-6">
          <div className="grid gap-4">
            {inv.map((card, i) => <InvestigationCard key={i} card={card} index={i} />)}
          </div>
        </TabsContent>
        <TabsContent value="financials" className="mt-6"><FinancialsTab fin={fin} /></TabsContent>
        <TabsContent value="news" className="mt-6"><NewsTab news={news} /></TabsContent>
        <TabsContent value="events" className="mt-6"><EventsTab events={events} /></TabsContent>
        <TabsContent value="dependencies" className="mt-6"><DependenciesTab deps={deps} /></TabsContent>
        <TabsContent value="scenarios" className="mt-6"><ScenarioTab ticker={c.ticker} company={c} /></TabsContent>
        <TabsContent value="research" className="mt-6">
          <div className="border border-slate-200 bg-white p-6">
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono-num">Contextual research</div>
            <h3 className="font-editorial text-2xl text-slate-900 mt-1">Ask the analyst</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">Use the AI research analyst to explore this company's dependencies, contradictions and risks. Answers cite the loaded company context.</p>
            <Button className="mt-4 bg-slate-900 hover:bg-slate-800 text-white" onClick={openAssistant} data-testid="research-open-assistant">
              <Sparkles size={14} className="mr-1" /> Open Analyst
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
