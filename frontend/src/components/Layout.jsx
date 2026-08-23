import React, { useState } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { Home, Compass, Building2, Star, FileSearch, GitCompareArrows, FlaskConical, BookOpen, Settings, Sparkles } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { AssistantPanel } from "@/components/AssistantPanel";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/watchlist", label: "Watchlist", icon: Star },
  { to: "/investigations", label: "Investigations", icon: FileSearch },
  { to: "/compare", label: "Compare", icon: GitCompareArrows },
  { to: "/scenario-lab", label: "Scenario Lab", icon: FlaskConical },
  { to: "/research", label: "Research", icon: BookOpen },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Wordmark = () => (
  <Link to="/" className="flex items-center gap-2" data-testid="us-logo">
    <div className="w-7 h-7 border border-slate-900 grid place-items-center">
      <div className="w-3 h-3 border border-slate-900 rotate-45" />
    </div>
    <div className="font-editorial text-[22px] leading-none tracking-tight text-slate-900">
      Under<span className="italic">Scope</span>
    </div>
  </Link>
);

export const Layout = () => {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantCtx, setAssistantCtx] = useState({});
  const location = useLocation();

  // If we're on /company/:ticker, treat the topbar Ask Analyst as company-grounded.
  const routeTicker = React.useMemo(() => {
    const m = location.pathname.match(/^\/company\/([^/]+)/i);
    return m ? decodeURIComponent(m[1]).toUpperCase() : null;
  }, [location.pathname]);

  // Global event to open the assistant from anywhere (company pages, etc.)
  React.useEffect(() => {
    const handler = (e) => {
      setAssistantCtx(e.detail || {});
      setAssistantOpen(true);
    };
    window.addEventListener("underscope:open-assistant", handler);
    return () => window.removeEventListener("underscope:open-assistant", handler);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:flex md:flex-col border-r border-slate-200 bg-white">
        <div className="px-5 py-6 border-b border-slate-200">
          <Wordmark />
          <p className="mt-2 text-[11px] text-slate-500 leading-snug">
            See what the market is missing.
          </p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2 text-sm border-l-2 ${
                  isActive
                    ? "border-slate-900 text-slate-900 bg-slate-50 font-medium"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
              data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-slate-200 text-[10px] text-slate-500 font-mono-num tracking-wider uppercase">
          Demo Data · v1
        </div>
      </aside>

      <div className="flex flex-col min-h-screen">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4 px-5 md:px-8 py-3">
            <div className="md:hidden">
              <Wordmark />
            </div>
            <div className="flex-1 max-w-xl">
              <GlobalSearch />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white shrink-0"
              onClick={() => {
                setAssistantCtx(routeTicker ? { ticker: routeTicker } : {});
                setAssistantOpen(true);
              }}
              data-testid="open-assistant"
            >
              <Sparkles size={14} className="mr-1" /> <span className="hidden md:inline">Ask Analyst</span><span className="md:hidden">Ask</span>
            </Button>
          </div>
          <div className="md:hidden border-t border-slate-200 overflow-x-auto">
            <div className="flex">
              {NAV.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-xs shrink-0 border-b-2 ${
                      isActive ? "border-slate-900 text-slate-900" : "border-transparent text-slate-600"
                    }`
                  }
                >
                  <Icon size={14} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 md:px-8 py-6 md:py-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-5 md:px-8 py-4 text-[11px] text-slate-500 leading-relaxed">
          UnderScope provides financial research and scenario analysis for informational and educational purposes only. It does not
          provide personalized investment advice or guarantee future market outcomes. Prices and figures shown are illustrative
          demo data.
        </footer>
      </div>

      <AssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        ticker={assistantCtx.ticker}
        companyName={assistantCtx.name}
      />
    </div>
  );
};
