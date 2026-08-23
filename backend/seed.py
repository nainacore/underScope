"""Seed data for UnderScope demo. Realistic financial demo data (clearly demo)."""

COMPANIES = [
    # US / Global
    {
        "ticker": "NVDA", "name": "NVIDIA Corporation", "exchange": "NASDAQ", "country": "US",
        "sector": "Semiconductors", "industry": "Graphics & AI Chips",
        "price": 892.41, "change_pct": -2.34, "change_abs": -21.37,
        "market_cap_b": 2196.0, "pe": 68.4, "revenue_growth_pct": 122.4, "eps_ttm": 13.05,
        "logo_bg": "#76B900",
        "snapshot": "NVIDIA designs GPUs and accelerated-computing platforms. Its data-center business now dominates revenue, powering AI training and inference workloads for hyperscalers, sovereign AI programs, and enterprises worldwide.",
        "hq": "Santa Clara, California",
        "employees": 29600,
        "founded": 1993,
        "recent_event": "Hopper-to-Blackwell transition; hyperscaler capex commitments extended into 2026.",
    },
    {
        "ticker": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Consumer Electronics", "industry": "Devices & Services",
        "price": 231.05, "change_pct": 0.42, "change_abs": 0.97,
        "market_cap_b": 3510.0, "pe": 34.2, "revenue_growth_pct": 3.9, "eps_ttm": 6.75,
        "logo_bg": "#111111",
        "snapshot": "Apple designs consumer electronics (iPhone, Mac, iPad, Watch) and monetises a services layer (App Store, iCloud, Ads, Payments). Services now drive incremental margin expansion above hardware.",
        "hq": "Cupertino, California", "employees": 164000, "founded": 1976,
        "recent_event": "Services revenue crossed $100B annualised; regulatory pressure on App Store take-rate in EU and India.",
    },
    {
        "ticker": "MSFT", "name": "Microsoft Corporation", "exchange": "NASDAQ", "country": "US",
        "sector": "Software", "industry": "Cloud & Productivity",
        "price": 418.71, "change_pct": 1.12, "change_abs": 4.64,
        "market_cap_b": 3110.0, "pe": 36.8, "revenue_growth_pct": 15.2, "eps_ttm": 11.38,
        "logo_bg": "#0078D4",
        "snapshot": "Microsoft operates Azure cloud, Microsoft 365, Windows, LinkedIn, GitHub and Xbox. Azure and Copilot are the primary growth engines; AI infrastructure spending is a material capex line.",
        "hq": "Redmond, Washington", "employees": 228000, "founded": 1975,
        "recent_event": "Capex guidance raised to fund AI datacenter buildout; Copilot attach-rate remains under scrutiny.",
    },
    {
        "ticker": "GOOGL", "name": "Alphabet Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Internet", "industry": "Search & Cloud",
        "price": 179.22, "change_pct": -0.65, "change_abs": -1.17,
        "market_cap_b": 2210.0, "pe": 25.7, "revenue_growth_pct": 13.9, "eps_ttm": 6.97,
        "logo_bg": "#4285F4",
        "snapshot": "Alphabet monetises search advertising, YouTube, and Google Cloud. Waymo and DeepMind sit inside Other Bets and Research; Gemini underpins a search product transition.",
        "hq": "Mountain View, California", "employees": 182000, "founded": 1998,
        "recent_event": "Antitrust rulings in the US; AI Overviews reshape search monetisation dynamics.",
    },
    {
        "ticker": "AMZN", "name": "Amazon.com, Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Internet Retail", "industry": "E-commerce & Cloud",
        "price": 186.30, "change_pct": 0.88, "change_abs": 1.62,
        "market_cap_b": 1950.0, "pe": 45.1, "revenue_growth_pct": 11.0, "eps_ttm": 4.13,
        "logo_bg": "#FF9900",
        "snapshot": "Amazon operates online retail, third-party marketplace, Prime, AWS cloud, advertising, and logistics. AWS and Ads drive the majority of operating income.",
        "hq": "Seattle, Washington", "employees": 1541000, "founded": 1994,
        "recent_event": "AWS growth re-accelerated on AI workloads; retail margins improved on regionalised fulfilment.",
    },
    {
        "ticker": "META", "name": "Meta Platforms, Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Internet", "industry": "Social Media & AR/VR",
        "price": 512.14, "change_pct": 1.94, "change_abs": 9.74,
        "market_cap_b": 1300.0, "pe": 27.4, "revenue_growth_pct": 22.1, "eps_ttm": 18.69,
        "logo_bg": "#0866FF",
        "snapshot": "Meta runs Facebook, Instagram, WhatsApp and Threads. Reality Labs continues to invest in AR/VR and AI. Ad revenue benefits from Reels monetisation and AI-driven targeting improvements.",
        "hq": "Menlo Park, California", "employees": 70799, "founded": 2004,
        "recent_event": "Reality Labs losses widened; AI recommendation engine drove double-digit engagement gains.",
    },
    {
        "ticker": "NFLX", "name": "Netflix, Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Entertainment", "industry": "Streaming",
        "price": 678.44, "change_pct": -1.23, "change_abs": -8.45,
        "market_cap_b": 290.0, "pe": 42.9, "revenue_growth_pct": 15.0, "eps_ttm": 15.83,
        "logo_bg": "#E50914",
        "snapshot": "Netflix operates a global streaming service with a growing ad-supported tier and paid-sharing enforcement. Content spend has stabilised while operating leverage expands.",
        "hq": "Los Gatos, California", "employees": 13000, "founded": 1997,
        "recent_event": "Ad tier reached 40M+ MAUs; live sports experiments accelerated.",
    },
    {
        "ticker": "TSLA", "name": "Tesla, Inc.", "exchange": "NASDAQ", "country": "US",
        "sector": "Automotive", "industry": "EV & Energy",
        "price": 248.98, "change_pct": -3.11, "change_abs": -7.99,
        "market_cap_b": 790.0, "pe": 71.2, "revenue_growth_pct": 1.0, "eps_ttm": 3.50,
        "logo_bg": "#CC0000",
        "snapshot": "Tesla manufactures electric vehicles, energy storage and solar products. Optionality is priced into autonomy (FSD/Robotaxi) and Optimus rather than the core auto business.",
        "hq": "Austin, Texas", "employees": 140000, "founded": 2003,
        "recent_event": "China price cuts continued; Cybertruck ramp slower than internal targets.",
    },
    {
        "ticker": "JPM", "name": "JPMorgan Chase & Co.", "exchange": "NYSE", "country": "US",
        "sector": "Banking", "industry": "Diversified Financials",
        "price": 218.44, "change_pct": 0.31, "change_abs": 0.68,
        "market_cap_b": 630.0, "pe": 12.4, "revenue_growth_pct": 6.5, "eps_ttm": 17.62,
        "logo_bg": "#0F4C82",
        "snapshot": "JPMorgan is the largest US bank by assets, spanning consumer banking, corporate & investment banking, asset & wealth management. Net interest income is the largest revenue line.",
        "hq": "New York, NY", "employees": 316000, "founded": 2000,
        "recent_event": "Deposit re-pricing began to normalise; loan-loss reserves modestly rebuilt.",
    },
    {
        "ticker": "GS", "name": "Goldman Sachs Group, Inc.", "exchange": "NYSE", "country": "US",
        "sector": "Banking", "industry": "Investment Banking",
        "price": 495.10, "change_pct": 0.87, "change_abs": 4.27,
        "market_cap_b": 162.0, "pe": 14.6, "revenue_growth_pct": 12.0, "eps_ttm": 33.90,
        "logo_bg": "#7399C6",
        "snapshot": "Goldman Sachs runs Global Banking & Markets, Asset & Wealth Management, and Platform Solutions. Trading and advisory dominate the P&L.",
        "hq": "New York, NY", "employees": 44300, "founded": 1869,
        "recent_event": "IB backlog rebuilt on M&A recovery; Marcus consumer exit largely complete.",
    },
    {
        "ticker": "V", "name": "Visa Inc.", "exchange": "NYSE", "country": "US",
        "sector": "Financial Services", "industry": "Payments Network",
        "price": 285.55, "change_pct": 0.42, "change_abs": 1.19,
        "market_cap_b": 570.0, "pe": 30.9, "revenue_growth_pct": 10.0, "eps_ttm": 9.24,
        "logo_bg": "#1A1F71",
        "snapshot": "Visa operates the world's largest payments network, earning fees on payment volume, cross-border activity, and value-added services.",
        "hq": "San Francisco, California", "employees": 28800, "founded": 1958,
        "recent_event": "Cross-border volumes decelerated on travel normalisation; VAS revenue continued to outgrow core.",
    },
    {
        "ticker": "MA", "name": "Mastercard Incorporated", "exchange": "NYSE", "country": "US",
        "sector": "Financial Services", "industry": "Payments Network",
        "price": 480.11, "change_pct": 0.54, "change_abs": 2.58,
        "market_cap_b": 447.0, "pe": 36.5, "revenue_growth_pct": 12.5, "eps_ttm": 13.15,
        "logo_bg": "#EB001B",
        "snapshot": "Mastercard operates a global payments network with a fast-growing services & data analytics business complementing switching fees.",
        "hq": "Purchase, New York", "employees": 33400, "founded": 1966,
        "recent_event": "Services segment now ~35% of revenue; rebates & incentives grew alongside issuer competition.",
    },
    {
        "ticker": "BLK", "name": "BlackRock, Inc.", "exchange": "NYSE", "country": "US",
        "sector": "Asset Management", "industry": "Investment Management",
        "price": 972.30, "change_pct": 0.19, "change_abs": 1.84,
        "market_cap_b": 145.0, "pe": 22.4, "revenue_growth_pct": 9.4, "eps_ttm": 43.35,
        "logo_bg": "#111111",
        "snapshot": "BlackRock is the world's largest asset manager, spanning iShares ETFs, active strategies, Aladdin technology, and private markets after the GIP acquisition.",
        "hq": "New York, NY", "employees": 19800, "founded": 1988,
        "recent_event": "Record AUM; private markets platform scaled via GIP integration.",
    },
    {
        "ticker": "KO", "name": "The Coca-Cola Company", "exchange": "NYSE", "country": "US",
        "sector": "Consumer Staples", "industry": "Beverages",
        "price": 68.90, "change_pct": -0.14, "change_abs": -0.10,
        "market_cap_b": 297.0, "pe": 25.6, "revenue_growth_pct": 6.4, "eps_ttm": 2.69,
        "logo_bg": "#F40009",
        "snapshot": "Coca-Cola sells non-alcoholic beverage concentrates and finished products globally through a bottler network. Pricing and mix drive most of recent growth.",
        "hq": "Atlanta, Georgia", "employees": 79000, "founded": 1892,
        "recent_event": "Emerging-market volumes softened; developed-market pricing normalised.",
    },
    {
        "ticker": "MCD", "name": "McDonald's Corporation", "exchange": "NYSE", "country": "US",
        "sector": "Consumer Discretionary", "industry": "Restaurants",
        "price": 293.44, "change_pct": -0.42, "change_abs": -1.23,
        "market_cap_b": 210.0, "pe": 25.1, "revenue_growth_pct": 3.2, "eps_ttm": 11.70,
        "logo_bg": "#FFC72C",
        "snapshot": "McDonald's operates and franchises quick-service restaurants globally. Franchise royalties and rent drive margin quality; value-menu strategy is a key focus in the US.",
        "hq": "Chicago, Illinois", "employees": 150000, "founded": 1940,
        "recent_event": "US low-income traffic weakened; $5 value meal reset positioning.",
    },
    {
        "ticker": "WMT", "name": "Walmart Inc.", "exchange": "NYSE", "country": "US",
        "sector": "Consumer Staples", "industry": "Retail",
        "price": 76.85, "change_pct": 0.62, "change_abs": 0.47,
        "market_cap_b": 618.0, "pe": 30.1, "revenue_growth_pct": 5.8, "eps_ttm": 2.55,
        "logo_bg": "#0071CE",
        "snapshot": "Walmart operates retail stores and e-commerce globally, with fast-growing advertising (Walmart Connect) and marketplace businesses supplementing groceries.",
        "hq": "Bentonville, Arkansas", "employees": 2100000, "founded": 1962,
        "recent_event": "Higher-income shoppers drove US comps; advertising revenue continued to grow above 25%.",
    },
    {
        "ticker": "JNJ", "name": "Johnson & Johnson", "exchange": "NYSE", "country": "US",
        "sector": "Healthcare", "industry": "Pharma & MedTech",
        "price": 155.28, "change_pct": -0.32, "change_abs": -0.50,
        "market_cap_b": 374.0, "pe": 22.9, "revenue_growth_pct": 4.4, "eps_ttm": 6.78,
        "logo_bg": "#D71E28",
        "snapshot": "J&J operates innovative medicines (Janssen) and medical devices after spinning off consumer health (Kenvue). Pipeline breadth remains a defining strength.",
        "hq": "New Brunswick, New Jersey", "employees": 131900, "founded": 1886,
        "recent_event": "Talc litigation overhang persists; Stelara loss-of-exclusivity is the near-term risk.",
    },
    # India
    {
        "ticker": "RELIANCE", "name": "Reliance Industries Ltd.", "exchange": "NSE", "country": "IN",
        "sector": "Conglomerate", "industry": "Oil-to-Chemicals, Telecom, Retail",
        "price": 2882.30, "change_pct": 0.72, "change_abs": 20.60,
        "market_cap_b": 233.0, "pe": 24.6, "revenue_growth_pct": 7.6, "eps_ttm": 117.16,
        "logo_bg": "#00457C",
        "snapshot": "Reliance operates oil-to-chemicals (O2C), Jio (telecom & digital), Reliance Retail, and new energy. The retail and digital businesses are being carved out as future value drivers.",
        "hq": "Mumbai, India", "employees": 347000, "founded": 1966,
        "recent_event": "Jio ARPU inched up; new-energy capex ramp continued at Jamnagar.",
    },
    {
        "ticker": "TCS", "name": "Tata Consultancy Services", "exchange": "NSE", "country": "IN",
        "sector": "IT Services", "industry": "IT & Consulting",
        "price": 4118.55, "change_pct": -0.19, "change_abs": -7.85,
        "market_cap_b": 179.0, "pe": 30.2, "revenue_growth_pct": 4.1, "eps_ttm": 136.44,
        "logo_bg": "#1B2951",
        "snapshot": "TCS is India's largest IT services firm, serving global BFSI, retail, and manufacturing clients. GenAI deal pipeline is growing while discretionary spend remains cautious.",
        "hq": "Mumbai, India", "employees": 601000, "founded": 1968,
        "recent_event": "BFSI recovery still uneven; utilisation normalised, freeing hiring capacity.",
    },
    {
        "ticker": "TATAMOTORS", "name": "Tata Motors Ltd.", "exchange": "NSE", "country": "IN",
        "sector": "Automotive", "industry": "Automobiles",
        "price": 942.10, "change_pct": 1.44, "change_abs": 13.40,
        "market_cap_b": 41.0, "pe": 9.6, "revenue_growth_pct": 12.7, "eps_ttm": 98.10,
        "logo_bg": "#004B8D",
        "snapshot": "Tata Motors owns Jaguar Land Rover (JLR), Tata Commercial Vehicles, and Tata Passenger EVs. JLR ASP mix and India EV leadership are the key value drivers.",
        "hq": "Mumbai, India", "employees": 81511, "founded": 1945,
        "recent_event": "JLR order book normalised; India EV share pressured by new competitive launches.",
    },
    {
        "ticker": "HDFCBANK", "name": "HDFC Bank Ltd.", "exchange": "NSE", "country": "IN",
        "sector": "Banking", "industry": "Private Banking",
        "price": 1712.65, "change_pct": 0.18, "change_abs": 3.05,
        "market_cap_b": 155.0, "pe": 18.3, "revenue_growth_pct": 15.8, "eps_ttm": 93.60,
        "logo_bg": "#004C8F",
        "snapshot": "HDFC Bank is India's largest private-sector bank after the HDFC Ltd. merger. Deposit growth, LDR normalisation, and NIM recovery are current focus areas.",
        "hq": "Mumbai, India", "employees": 213000, "founded": 1994,
        "recent_event": "Deposit growth outpaced credit; LDR gradually compressed as targeted.",
    },
    {
        "ticker": "ICICIBANK", "name": "ICICI Bank Ltd.", "exchange": "NSE", "country": "IN",
        "sector": "Banking", "industry": "Private Banking",
        "price": 1265.90, "change_pct": 0.34, "change_abs": 4.30,
        "market_cap_b": 106.0, "pe": 18.7, "revenue_growth_pct": 16.1, "eps_ttm": 67.65,
        "logo_bg": "#F58220",
        "snapshot": "ICICI Bank is a large private-sector Indian bank with strong retail and SME franchises, best-in-class digital capabilities, and a diversified subsidiary portfolio.",
        "hq": "Mumbai, India", "employees": 141000, "founded": 1994,
        "recent_event": "Unsecured retail growth moderated on RBI guidance; asset quality remained benign.",
    },
    {
        "ticker": "INFY", "name": "Infosys Ltd.", "exchange": "NSE", "country": "IN",
        "sector": "IT Services", "industry": "IT & Consulting",
        "price": 1878.40, "change_pct": 0.65, "change_abs": 12.10,
        "market_cap_b": 93.0, "pe": 27.5, "revenue_growth_pct": 4.7, "eps_ttm": 68.30,
        "logo_bg": "#007CC3",
        "snapshot": "Infosys is a large Indian IT services firm with growing GenAI (Topaz) offerings. Cost takeout and vendor consolidation deals shape near-term growth.",
        "hq": "Bengaluru, India", "employees": 317000, "founded": 1981,
        "recent_event": "Guidance narrowed; discretionary spend cautious ex-BFSI.",
    },
    {
        "ticker": "ETERNAL", "name": "Eternal Ltd. (Zomato)", "exchange": "NSE", "country": "IN",
        "sector": "Internet", "industry": "Food Delivery & Quick Commerce",
        "price": 268.75, "change_pct": 2.14, "change_abs": 5.63,
        "market_cap_b": 30.0, "pe": 118.0, "revenue_growth_pct": 68.5, "eps_ttm": 2.28,
        "logo_bg": "#E23744",
        "snapshot": "Eternal (formerly Zomato) operates food delivery, Blinkit (quick commerce), Hyperpure (B2B), and District (going-out). Blinkit is the fastest-growing segment.",
        "hq": "Gurugram, India", "employees": 8100, "founded": 2008,
        "recent_event": "Blinkit GOV growth outpaced food delivery; dark-store footprint expanded aggressively.",
    },
]

CURRENCY_BY_COUNTRY = {"US": "$", "IN": "₹"}

MARKET_INDICES = [
    {"key": "NIFTY50", "name": "NIFTY 50", "value": 24689.15, "change_pct": 0.41, "region": "IN"},
    {"key": "SPX", "name": "S&P 500", "value": 5842.90, "change_pct": 0.28, "region": "US"},
    {"key": "NDX", "name": "NASDAQ Composite", "value": 18726.14, "change_pct": 0.62, "region": "US"},
    {"key": "DJI", "name": "Dow Jones Industrial", "value": 43120.55, "change_pct": -0.18, "region": "US"},
    {"key": "USDINR", "name": "USD/INR", "value": 84.62, "change_pct": -0.06, "region": "FX"},
    {"key": "CRUDE", "name": "Crude Oil (WTI)", "value": 71.44, "change_pct": 1.08, "region": "COMMODITY"},
    {"key": "GOLD", "name": "Gold (USD/oz)", "value": 2688.10, "change_pct": 0.42, "region": "COMMODITY"},
    {"key": "BTC", "name": "Bitcoin", "value": 94320.55, "change_pct": -1.20, "region": "CRYPTO"},
]

MARKET_SIGNALS = [
    {"id": "ai-infra", "title": "AI Infrastructure Spending", "delta": "+41% YoY hyperscaler capex", "summary": "Hyperscaler AI capex guidance keeps accelerating; power availability is now the binding constraint, not GPU supply.", "affects": ["NVDA", "MSFT", "GOOGL", "AMZN", "META"]},
    {"id": "rates", "title": "Interest Rates", "delta": "Fed on hold; RBI cautious", "summary": "Higher-for-longer rates pressure duration-sensitive equities and unsecured lenders; benefits net-cash businesses.", "affects": ["JPM", "GS", "HDFCBANK", "ICICIBANK"]},
    {"id": "oil", "title": "Crude Oil", "delta": "$71/bbl; range-bound", "summary": "OPEC+ supply discipline vs weakening China demand keeps oil range-bound; input-cost tailwind for downstream, mixed for O2C.", "affects": ["RELIANCE", "KO", "MCD"]},
    {"id": "semi", "title": "Semiconductor Demand", "delta": "AI up, auto/industrial down", "summary": "AI accelerator demand remains rationed; legacy auto and industrial semis absorb inventory correction.", "affects": ["NVDA", "TSLA"]},
    {"id": "indian-banks", "title": "Indian Banking", "delta": "LDR normalising; unsecured moderating", "summary": "Deposit growth outpacing credit; RBI micro-regulation on unsecured lending is reshaping mix.", "affects": ["HDFCBANK", "ICICIBANK"]},
    {"id": "consumer", "title": "US Consumer Spending", "delta": "K-shaped; low-income weakening", "summary": "Low-income US consumer weakness pressures QSR value tiers; higher-income holds up premium categories.", "affects": ["MCD", "WMT", "KO"]},
]

TRENDING_TICKERS = ["NVDA", "AAPL", "RELIANCE", "TSLA", "AMZN", "NFLX"]


def _series(base, drift, vol, n=90):
    """Deterministic pseudo-random series for demo price charts."""
    import math
    out = []
    x = base
    for i in range(n):
        # simple deterministic oscillation
        x = x * (1 + drift + vol * math.sin(i / 6.3) * 0.4 + vol * math.cos(i / 3.1) * 0.3)
        out.append(round(x, 2))
    return out


def price_history(ticker: str):
    c = next((x for x in COMPANIES if x["ticker"] == ticker), None)
    if not c:
        return []
    base = c["price"] * 0.78
    series = _series(base, drift=0.0028, vol=0.012, n=120)
    # snap last point to current price
    series[-1] = c["price"]
    return series


# Investigation seed content: 3-5 cards per company.
# type: "verified_fact" | "reported_event" | "ai_interpretation" | "scenario_assumption"
INVESTIGATIONS = {
    "NVDA": [
        {"category": "Concentration Risk", "type": "verified_fact", "confidence": 92,
         "finding": "Roughly 40% of NVIDIA's data-center revenue is tied to a handful of hyperscaler customers.",
         "why": "Customer concentration means order-slippage from 1–2 hyperscalers can materially reset quarterly guidance despite unchanged end-demand.",
         "evidence": "10-K risk factors and quarterly disclosures reference significant customer concentration; independent estimates (Bloomberg, Barron's) attribute ~40% of DC revenue to top 4 buyers.",
         "metrics": [{"label": "Top-4 DC exposure (est.)", "value": "~40%"}, {"label": "DC revenue share", "value": "88%"}],
         "sources": ["NVDA 10-K FY24 – Risk Factors", "Q3 FY25 earnings call transcript"]},
        {"category": "Supply Chain Exposure", "type": "verified_fact", "confidence": 95,
         "finding": "NVIDIA is structurally dependent on TSMC's advanced packaging (CoWoS) capacity.",
         "why": "Blackwell shipments are gated by CoWoS-L capacity, not silicon; any Taiwan disruption or TSMC allocation shift is a direct revenue constraint.",
         "evidence": "Management commentary references CoWoS as the primary supply constraint; TSMC guided material capex to expand advanced packaging.",
         "metrics": [{"label": "Advanced-node supplier", "value": "TSMC (~100%)"}, {"label": "Packaging", "value": "CoWoS-L"}],
         "sources": ["NVDA Q4 FY24 call", "TSMC quarterly transcript"]},
        {"category": "Valuation Tension", "type": "ai_interpretation", "confidence": 68,
         "finding": "Consensus revenue for FY26 already models AI capex growth persisting at hyperscaler-guided levels.",
         "why": "If AI capex growth decelerates from ~40% to a more normalised 15–20%, forward multiples compress even without an EPS miss.",
         "evidence": "Sell-side consensus revenue trajectory implicitly assumes hyperscaler capex commentary is durable through 2026.",
         "metrics": [{"label": "FY26 rev growth (consensus)", "value": "~52%"}, {"label": "Fwd P/E", "value": "~34x"}],
         "sources": ["Consensus estimates (demo)", "Hyperscaler capex guidance"]},
        {"category": "Competitive Pressure", "type": "reported_event", "confidence": 74,
         "finding": "Hyperscaler in-house silicon programs (Trainium, TPU, MAIA) are moving from experimental to production workloads.",
         "why": "Custom silicon captures inference share first; NVIDIA's inference moat narrows even if training remains dominant.",
         "evidence": "AWS Trainium2, Google TPUv5p, Microsoft MAIA production deployments reported by hyperscalers themselves.",
         "metrics": [{"label": "Inference vs training mix (est.)", "value": "shifting toward inference"}],
         "sources": ["AWS re:Invent keynote", "Google Cloud Next"]},
        {"category": "Macro Sensitivity", "type": "scenario_assumption", "confidence": 55,
         "finding": "Higher-for-longer rates could delay non-hyperscaler AI capex by sovereigns and enterprises.",
         "why": "Sovereign AI + enterprise AI clusters carry longer payback periods; higher cost of capital extends decision cycles.",
         "evidence": "Elongation of enterprise AI RFPs noted by multiple systems integrators (SIs).",
         "metrics": [{"label": "Non-hyperscaler DC mix (est.)", "value": "~25%"}],
         "sources": ["Scenario assumption – demo"]},
    ],
    "AAPL": [
        {"category": "Concentration Risk", "type": "verified_fact", "confidence": 90,
         "finding": "iPhone still generates roughly half of Apple's revenue.",
         "why": "Services growth reduces sensitivity, but iPhone unit cycles remain the primary swing factor for revenue and gross-profit dollars.",
         "evidence": "Segment disclosures in Apple 10-K.",
         "metrics": [{"label": "iPhone revenue share", "value": "~52%"}, {"label": "Services share", "value": "~24%"}],
         "sources": ["AAPL 10-K FY24"]},
        {"category": "Regulatory Exposure", "type": "reported_event", "confidence": 82,
         "finding": "EU DMA and India's proposed digital competition bill directly target App Store take-rate.",
         "why": "Services gross margin is materially above hardware; take-rate compression flows disproportionately to operating income.",
         "evidence": "EU DMA compliance changes; India Digital Competition Bill drafts.",
         "metrics": [{"label": "App Store standard rate", "value": "30%"}, {"label": "Services gross margin", "value": "~74%"}],
         "sources": ["EU DMA text", "MeitY draft bill"]},
        {"category": "Margin Pressure", "type": "ai_interpretation", "confidence": 62,
         "finding": "Services mix expansion has offset a mild hardware GM slippage.",
         "why": "Once Services growth normalises, hardware ASP mix will need to carry more of the margin story.",
         "evidence": "Products GM vs Services GM disclosed each quarter.",
         "metrics": [{"label": "Services GM", "value": "~74%"}, {"label": "Products GM", "value": "~37%"}],
         "sources": ["AAPL 10-Q disclosures"]},
        {"category": "Macro Sensitivity", "type": "scenario_assumption", "confidence": 55,
         "finding": "China consumer weakness could drive a second consecutive year of iPhone unit decline in Greater China.",
         "why": "Greater China is Apple's second-largest region; a durable slowdown alters replacement-cycle math.",
         "evidence": "Third-party Counterpoint/IDC reports referenced in press.",
         "metrics": [{"label": "Greater China revenue share", "value": "~17%"}],
         "sources": ["Counterpoint (demo)", "IDC (demo)"]},
    ],
    "RELIANCE": [
        {"category": "Contradictions", "type": "ai_interpretation", "confidence": 70,
         "finding": "Management commentary emphasises 'new energy' as a value driver, while reported EBITDA still leans heavily on O2C and Jio.",
         "why": "Investors are being asked to price optionality before the earnings mix reflects it.",
         "evidence": "Segment EBITDA disclosure vs. AGM commentary.",
         "metrics": [{"label": "O2C EBITDA share", "value": "~34%"}, {"label": "Jio EBITDA share", "value": "~30%"}, {"label": "New Energy EBITDA share", "value": "de minimis"}],
         "sources": ["RIL Annual Report", "RIL AGM 2024 transcript"]},
        {"category": "Concentration Risk", "type": "verified_fact", "confidence": 88,
         "finding": "Jio ARPU growth is the primary lever for consolidated Digital Services growth.",
         "why": "Subscriber additions have plateaued; ARPU repricing carries execution & regulatory risk.",
         "evidence": "Jio quarterly disclosures.",
         "metrics": [{"label": "Jio ARPU (INR)", "value": "~181"}, {"label": "Subs (mn)", "value": "~479"}],
         "sources": ["RIL Q2 FY25 press release"]},
        {"category": "Capital Allocation", "type": "reported_event", "confidence": 75,
         "finding": "New-energy capex at Jamnagar remains significant while free cash flow generation stays uneven.",
         "why": "Balance-sheet capacity is stretched relative to prior deleveraging expectations.",
         "evidence": "Capex trajectory in annual filings and management commentary.",
         "metrics": [{"label": "Net debt (INR cr)", "value": "~2.9L"}],
         "sources": ["RIL FY24 Annual Report"]},
        {"category": "Regulatory Exposure", "type": "scenario_assumption", "confidence": 55,
         "finding": "Retail carve-out and listing timelines depend on regulatory approvals and market conditions.",
         "why": "Listing timing directly affects the crystallisation of Retail's private valuation into public multiples.",
         "evidence": "Public statements from management indicating listing readiness in future years.",
         "metrics": [{"label": "Retail EBITDA share", "value": "~16%"}],
         "sources": ["Scenario assumption – demo"]},
    ],
    "TCS": [
        {"category": "Macro Sensitivity", "type": "verified_fact", "confidence": 84,
         "finding": "BFSI vertical is TCS's single largest exposure and drives discretionary demand cycles.",
         "why": "Even a 200bps swing in BFSI spend meaningfully impacts revenue growth.",
         "evidence": "TCS segment disclosures.",
         "metrics": [{"label": "BFSI share", "value": "~32%"}],
         "sources": ["TCS FY24 Annual Report"]},
        {"category": "Currency Sensitivity", "type": "verified_fact", "confidence": 90,
         "finding": "TCS earns predominantly in USD but reports in INR — a stronger rupee compresses INR revenue growth.",
         "why": "Translation impact is a mechanical drag that can mask underlying constant-currency performance.",
         "evidence": "Constant-currency reconciliation in quarterly release.",
         "metrics": [{"label": "USD revenue share", "value": "~50%"}],
         "sources": ["TCS Q3 FY25 press release"]},
        {"category": "Competitive Pressure", "type": "ai_interpretation", "confidence": 60,
         "finding": "GenAI-native firms and hyperscaler professional services compete for the same 'transformation' budgets.",
         "why": "Traditional headcount-based pricing is more exposed to productivity deflation than tools-led offerings.",
         "evidence": "Cloud partners' consulting revenue growth exceeds legacy SI peers.",
         "metrics": [{"label": "AI deal TCV (est.)", "value": "growing double-digit"}],
         "sources": ["Public commentary from cloud partners"]},
    ],
    "TSLA": [
        {"category": "Valuation Tension", "type": "ai_interpretation", "confidence": 66,
         "finding": "A large share of Tesla's market cap is attributed to autonomy (FSD/Robotaxi) and Optimus optionality.",
         "why": "Delivery on autonomy timelines is the primary variable, not vehicle unit growth.",
         "evidence": "Sell-side sum-of-parts valuations decompose valuation into auto core + autonomy + energy.",
         "metrics": [{"label": "Vehicle unit growth", "value": "~flat YoY"}],
         "sources": ["Consensus SOP models (demo)"]},
        {"category": "Competitive Pressure", "type": "reported_event", "confidence": 78,
         "finding": "Chinese OEMs (BYD, Li Auto, Xiaomi) continue to compress Tesla's China share.",
         "why": "China represents Tesla's largest overseas market and a critical export hub.",
         "evidence": "China Passenger Car Association (CPCA) monthly data (demo).",
         "metrics": [{"label": "China share (est.)", "value": "declining"}],
         "sources": ["CPCA monthly (demo)"]},
        {"category": "Margin Pressure", "type": "verified_fact", "confidence": 82,
         "finding": "Automotive gross margin ex-credits remained in the mid-teens through 2024.",
         "why": "Price cuts and mix have compressed automotive profitability faster than software/services scale.",
         "evidence": "Quarterly earnings disclosures.",
         "metrics": [{"label": "Auto GM ex-credits", "value": "~16%"}],
         "sources": ["TSLA Q3 2024 update letter"]},
    ],
    "HDFCBANK": [
        {"category": "Margin Pressure", "type": "verified_fact", "confidence": 86,
         "finding": "NIM compression post-merger has been slower to reverse than initially guided.",
         "why": "Deposit repricing and mix normalisation set the pace for the return to pre-merger NIM levels.",
         "evidence": "Reported NIM in quarterly investor presentations.",
         "metrics": [{"label": "Reported NIM", "value": "~3.4–3.5%"}, {"label": "LDR", "value": "normalising"}],
         "sources": ["HDFCB Q2 FY25 IR deck"]},
        {"category": "Regulatory Exposure", "type": "reported_event", "confidence": 74,
         "finding": "RBI's tightening on unsecured retail and priority-sector norms shape near-term growth mix.",
         "why": "Higher risk-weights on unsecured lending affect capital allocation across products.",
         "evidence": "RBI circulars.",
         "metrics": [{"label": "Unsecured retail (est.)", "value": "moderating"}],
         "sources": ["RBI circular Nov 2023"]},
    ],
}


# Financials series – annual & quarterly, small realistic-looking numbers.
def financials(ticker: str):
    """Return demo financials: income statement, balance sheet, cash flow."""
    base = next((c for c in COMPANIES if c["ticker"] == ticker), None)
    if not base:
        return None
    # scale factor loosely proportional to market cap
    scale = max(1.0, base["market_cap_b"] / 100.0)
    years = ["FY21", "FY22", "FY23", "FY24"]
    growth = base["revenue_growth_pct"] / 100.0
    rev = [round(30 * scale * (1 + growth) ** (i - 3), 1) for i in range(4)]
    gross = [round(r * 0.55, 1) for r in rev]
    op = [round(r * 0.28, 1) for r in rev]
    net = [round(r * 0.22, 1) for r in rev]
    eps = [round(base["eps_ttm"] * (1 + growth) ** (i - 3), 2) for i in range(4)]

    bs = {
        "cash": [round(rev[i] * 0.35, 1) for i in range(4)],
        "debt": [round(rev[i] * 0.28, 1) for i in range(4)],
        "assets": [round(rev[i] * 1.6, 1) for i in range(4)],
        "liabilities": [round(rev[i] * 0.9, 1) for i in range(4)],
    }
    cf = {
        "operating": [round(rev[i] * 0.30, 1) for i in range(4)],
        "capex": [round(-rev[i] * 0.10, 1) for i in range(4)],
        "fcf": [round(rev[i] * 0.20, 1) for i in range(4)],
    }
    return {
        "years": years,
        "income_statement": {
            "revenue": rev, "gross_profit": gross, "operating_income": op,
            "net_income": net, "eps": eps,
        },
        "balance_sheet": bs,
        "cash_flow": cf,
        "currency": CURRENCY_BY_COUNTRY.get(base["country"], "$"),
    }


TIMELINE = {
    "NVDA": [
        {"date": "2024-11-20", "type": "Earnings", "title": "Q3 FY25 earnings beat; DC revenue $30.8B", "importance": "high"},
        {"date": "2024-10-13", "type": "Product", "title": "Blackwell ramp commentary; CoWoS supply gating shipments", "importance": "medium"},
        {"date": "2024-08-28", "type": "Earnings", "title": "Q2 FY25 – DC 154% YoY; auto weakest segment", "importance": "high"},
        {"date": "2024-06-10", "type": "Corporate", "title": "10-for-1 stock split executed", "importance": "medium"},
        {"date": "2024-03-18", "type": "Product", "title": "Blackwell architecture unveiled at GTC", "importance": "high"},
    ],
    "AAPL": [
        {"date": "2024-10-31", "type": "Earnings", "title": "FY24 Q4 – Services $25B; iPhone flat YoY", "importance": "high"},
        {"date": "2024-09-09", "type": "Product", "title": "iPhone 16 launch; Apple Intelligence phased rollout", "importance": "high"},
        {"date": "2024-06-10", "type": "Product", "title": "Apple Intelligence announced at WWDC", "importance": "high"},
        {"date": "2024-03-04", "type": "Regulatory", "title": "EU DMA compliance changes take effect", "importance": "medium"},
    ],
    "RELIANCE": [
        {"date": "2024-10-14", "type": "Earnings", "title": "Q2 FY25 – O2C soft; Jio ARPU inches up", "importance": "high"},
        {"date": "2024-08-29", "type": "Corporate", "title": "AGM 2024 – new-energy giga complex progress", "importance": "medium"},
        {"date": "2024-07-15", "type": "Earnings", "title": "Q1 FY25 – Retail growth normalising", "importance": "medium"},
    ],
    "TSLA": [
        {"date": "2024-10-23", "type": "Earnings", "title": "Q3 2024 – Auto GM ex-credits ~17%", "importance": "high"},
        {"date": "2024-10-10", "type": "Product", "title": "Robotaxi (Cybercab) unveil event", "importance": "high"},
        {"date": "2024-07-23", "type": "Earnings", "title": "Q2 2024 – energy storage record", "importance": "medium"},
    ],
}


NEWS = {
    "NVDA": [
        {"date": "2025-01-28", "source": "Reuters (demo)", "topic": "AI Infra", "importance": "high",
         "title": "Hyperscalers reaffirm 2026 AI capex; power availability cited as binding constraint",
         "summary": "Hyperscaler CFOs reaffirmed 2026 AI capex budgets; several noted power/grid constraints have replaced GPU supply as the primary bottleneck.",
         "type": "reported_event"},
        {"date": "2025-01-15", "source": "Bloomberg (demo)", "topic": "Supply Chain", "importance": "high",
         "title": "TSMC accelerates CoWoS-L capacity expansion",
         "summary": "TSMC guided further advanced packaging capacity additions through 2026; NVIDIA remains the largest CoWoS customer.",
         "type": "reported_event"},
        {"date": "2025-01-04", "source": "SEC filing (demo)", "topic": "Regulatory", "importance": "medium",
         "title": "Export-control adjustments on advanced accelerators",
         "summary": "Updated export-control framework introduces tiered country access; management guided limited near-term revenue impact.",
         "type": "verified_fact"},
    ],
    "AAPL": [
        {"date": "2025-01-22", "source": "EU Commission (demo)", "topic": "Regulatory", "importance": "high",
         "title": "EU issues DMA compliance findings on App Store fee structure",
         "summary": "EU raised specific concerns on Apple's alternative fee structure under DMA; a broader enforcement action remains possible.",
         "type": "verified_fact"},
        {"date": "2025-01-08", "source": "Counterpoint (demo)", "topic": "Demand", "importance": "medium",
         "title": "China iPhone unit shipments continued to soften in Q4",
         "summary": "Third-party trackers reported continued unit softness for iPhone in Greater China; competition from domestic OEMs cited.",
         "type": "reported_event"},
    ],
    "RELIANCE": [
        {"date": "2025-01-14", "source": "RIL press release (demo)", "topic": "Earnings", "importance": "high",
         "title": "Q3 FY25 – Retail and Jio drive consolidated EBITDA",
         "summary": "Retail LFL growth stabilised; Jio ARPU inched up on tariff pass-through; O2C tracked benchmark cracks.",
         "type": "reported_event"},
    ],
    "TSLA": [
        {"date": "2025-01-24", "source": "CPCA (demo)", "topic": "Demand", "importance": "high",
         "title": "China EV market share shifts; Chinese OEMs continue to gain",
         "summary": "Tesla's China share slipped again in January amid aggressive new-model launches from BYD and Xiaomi.",
         "type": "reported_event"},
    ],
}


def dependency_map(ticker: str):
    """Rich dependency map: center + typed nodes with relationship, impact, confidence, evidence."""
    presets = {
        "NVDA": [
            {"label": "TSMC", "kind": "supplier", "relationship": "Sole foundry for leading-edge GPU nodes (4N, N3)", "impact": "Any Taiwan/TSMC disruption or allocation shift directly gates shipments.", "confidence": 95, "evidence": "NVDA 10-K risk factors; TSMC N3 capacity commentary."},
            {"label": "CoWoS-L Packaging", "kind": "supplier", "relationship": "Advanced packaging capacity bottleneck for Blackwell", "impact": "Shipments are gated by CoWoS-L, not silicon.", "confidence": 92, "evidence": "TSMC advanced-packaging capex guidance; NVDA supply commentary."},
            {"label": "HBM (SK Hynix / Micron)", "kind": "supplier", "relationship": "High-bandwidth memory suppliers for AI accelerators", "impact": "Second-order supply gate; HBM3E allocation shapes shipment mix.", "confidence": 82, "evidence": "SK Hynix / Micron earnings commentary."},
            {"label": "Hyperscalers", "kind": "customer", "relationship": "Top-4 buyers concentrate ~40% of DC revenue", "impact": "Customer capex slippage can reset quarterly guidance.", "confidence": 90, "evidence": "10-K risk factors; sell-side attribution."},
            {"label": "Sovereign AI Programs", "kind": "customer", "relationship": "Emerging non-hyperscaler demand cohort", "impact": "Diversifies demand but decision cycles are longer.", "confidence": 62, "evidence": "Management commentary on sovereign AI opportunities."},
            {"label": "US Export Controls", "kind": "regulation", "relationship": "Tiered country access for advanced accelerators", "impact": "Shapes country revenue mix; incremental compliance overhead.", "confidence": 88, "evidence": "US Commerce Department framework updates."},
            {"label": "Power Grid Capacity", "kind": "macro", "relationship": "Datacenter power availability", "impact": "Now the binding constraint on hyperscaler AI capex deployment.", "confidence": 78, "evidence": "Hyperscaler CFO commentary."},
            {"label": "CUDA Ecosystem", "kind": "moat", "relationship": "Developer + library lock-in", "impact": "Defends training workloads; less durable for inference vs custom silicon.", "confidence": 84, "evidence": "Developer surveys; hyperscaler custom-silicon roadmaps."},
            {"label": "AMD / Custom Silicon", "kind": "competitor", "relationship": "Trainium / TPU / MAIA competitive pressure", "impact": "Compresses inference share first; long-term training moat pressured.", "confidence": 72, "evidence": "AWS re:Invent; Google Cloud Next disclosures."},
        ],
        "AAPL": [
            {"label": "Foxconn / Pegatron", "kind": "supplier", "relationship": "Assembly partners concentrated in China / India / Vietnam", "impact": "Geopolitical and labour risk to iPhone unit ramp.", "confidence": 92, "evidence": "AAPL supplier disclosure list."},
            {"label": "TSMC (A / M silicon)", "kind": "supplier", "relationship": "Sole advanced-node silicon supplier", "impact": "Silicon supply gates product refresh cadence.", "confidence": 94, "evidence": "TSMC / AAPL commentary."},
            {"label": "Greater China Consumers", "kind": "customer", "relationship": "~17% of revenue and second-largest region", "impact": "Prolonged China weakness alters replacement-cycle math.", "confidence": 86, "evidence": "AAPL segment disclosures; Counterpoint / IDC."},
            {"label": "App Developers", "kind": "customer", "relationship": "Services flywheel and App Store take-rate", "impact": "Regulation on take-rate flows to Services margin.", "confidence": 84, "evidence": "AAPL Services disclosures."},
            {"label": "EU DMA / India DCB", "kind": "regulation", "relationship": "Digital-markets regulation targeting App Store fees", "impact": "Direct compression risk on Services gross margin.", "confidence": 82, "evidence": "EU DMA texts; MeitY DCB drafts."},
            {"label": "USD FX", "kind": "macro", "relationship": "USD/JPY, USD/CNY translation exposure", "impact": "Mechanical drag/tailwind on reported revenue.", "confidence": 75, "evidence": "AAPL 10-Q FX disclosures."},
            {"label": "Samsung / Chinese OEMs", "kind": "competitor", "relationship": "Premium-smartphone competition + platform alternatives", "impact": "Unit share and ASP pressure in select regions.", "confidence": 68, "evidence": "Counterpoint / IDC data."},
        ],
        "RELIANCE": [
            {"label": "Crude Oil", "kind": "commodity", "relationship": "Feedstock for O2C segment", "impact": "Cracks and spreads drive O2C EBITDA cycle.", "confidence": 90, "evidence": "RIL segment disclosure."},
            {"label": "Refining Margins (GRM)", "kind": "macro", "relationship": "Benchmark Singapore GRM tracks O2C realisations", "impact": "GRM swings directly translate to segment EBITDA.", "confidence": 88, "evidence": "Reuters GRM benchmark."},
            {"label": "Jio Subscribers", "kind": "customer", "relationship": "479mn subscriber base", "impact": "Subscriber plateau shifts value driver to ARPU repricing.", "confidence": 92, "evidence": "TRAI monthly data; Jio releases."},
            {"label": "Reliance Retail", "kind": "customer", "relationship": "India's largest organised retailer", "impact": "LFL growth and store additions drive Retail EBITDA.", "confidence": 86, "evidence": "RIL Retail disclosures."},
            {"label": "New Energy Capex", "kind": "capex", "relationship": "Multi-year Jamnagar giga complex build-out", "impact": "Long-cycle payback stretches balance-sheet capacity.", "confidence": 75, "evidence": "AGM presentations; annual reports."},
            {"label": "USD/INR", "kind": "macro", "relationship": "FX for O2C realisations and imports", "impact": "Rupee weakness supports export realisations, hurts imports.", "confidence": 78, "evidence": "RBI FX data."},
            {"label": "Regulators (SEBI / TRAI)", "kind": "regulation", "relationship": "Listing approvals and telecom pricing", "impact": "Retail/Jio listing timing is regulator-gated.", "confidence": 70, "evidence": "SEBI norms; TRAI tariff orders."},
            {"label": "Bharti Airtel / Vi", "kind": "competitor", "relationship": "Telecom competition for ARPU repricing", "impact": "Tariff-hike ability depends on peer moves.", "confidence": 74, "evidence": "TRAI ARPU tracking."},
        ],
        "TSLA": [
            {"label": "Battery Cell Suppliers", "kind": "supplier", "relationship": "Panasonic / CATL / LG cell supply", "impact": "Cell cost curve drives auto GM.", "confidence": 88, "evidence": "TSLA supply agreements."},
            {"label": "Lithium / Nickel", "kind": "commodity", "relationship": "Cell BOM commodities", "impact": "Commodity price swings flow into cost per kWh.", "confidence": 82, "evidence": "USGS / SMM data."},
            {"label": "China Demand", "kind": "customer", "relationship": "Largest overseas market and export hub", "impact": "Domestic OEMs are compressing Tesla's China share.", "confidence": 84, "evidence": "CPCA monthly data."},
            {"label": "FSD / Robotaxi Timeline", "kind": "optionality", "relationship": "Autonomy optionality embedded in valuation", "impact": "Timeline slippage compresses SOP valuation.", "confidence": 60, "evidence": "SOP models; management commentary."},
            {"label": "NHTSA / Regulators", "kind": "regulation", "relationship": "Autonomy and recall exposure", "impact": "Rules govern autonomy roll-out cadence.", "confidence": 72, "evidence": "NHTSA investigations."},
            {"label": "Charging Network", "kind": "moat", "relationship": "Supercharger network + NACS adoption", "impact": "Cross-OEM revenue and ecosystem lock-in.", "confidence": 78, "evidence": "OEM NACS adoption announcements."},
            {"label": "BYD / Chinese OEMs", "kind": "competitor", "relationship": "China EV price competition", "impact": "Share loss in Tesla's largest overseas market.", "confidence": 82, "evidence": "CPCA monthly registrations."},
        ],
        "HDFCBANK": [
            {"label": "Depositors", "kind": "customer", "relationship": "Retail + corporate deposit base", "impact": "Deposit growth rate sets LDR normalisation pace.", "confidence": 90, "evidence": "HDFCB quarterly disclosures."},
            {"label": "RBI", "kind": "regulation", "relationship": "Prudential regulator", "impact": "Risk-weights and PSL norms shape mix.", "confidence": 92, "evidence": "RBI circulars."},
            {"label": "Interest Rates (Repo)", "kind": "macro", "relationship": "Sets marginal cost of funds", "impact": "Rate-cut cycle affects NIM recovery pace.", "confidence": 84, "evidence": "RBI MPC statements."},
            {"label": "ICICI / Axis / SBI", "kind": "competitor", "relationship": "Deposit + retail lending competition", "impact": "Peer deposit strategies affect competitive intensity.", "confidence": 76, "evidence": "Peer quarterly disclosures."},
        ],
        "TCS": [
            {"label": "BFSI Clients", "kind": "customer", "relationship": "~32% of revenue from BFSI vertical", "impact": "BFSI discretionary spend cycles set growth trajectory.", "confidence": 88, "evidence": "TCS segment disclosures."},
            {"label": "USD Revenue", "kind": "macro", "relationship": "~50% of revenue in USD", "impact": "INR strength compresses reported growth.", "confidence": 90, "evidence": "TCS constant-currency reconciliation."},
            {"label": "GenAI Tools", "kind": "technology", "relationship": "Cloud partner tooling + internal Topaz", "impact": "Productivity deflation on headcount-priced work.", "confidence": 62, "evidence": "Cloud partner consulting revenue trajectory."},
            {"label": "Infosys / Wipro / Accenture", "kind": "competitor", "relationship": "Direct SI competition", "impact": "Deal-level pricing and win-rates.", "confidence": 74, "evidence": "Peer quarterly disclosures."},
        ],
    }
    center = next((c for c in COMPANIES if c["ticker"] == ticker), None)
    if not center:
        return {"center": ticker, "nodes": []}
    nodes = presets.get(ticker)
    if not nodes:
        nodes = [
            {"label": "Key suppliers", "kind": "supplier", "relationship": "Primary supplier network", "impact": "Supply concentration risk relevant to " + center["industry"], "confidence": 60, "evidence": "Sector reference."},
            {"label": "Key customers", "kind": "customer", "relationship": "Concentration and mix", "impact": "Customer concentration shapes revenue durability.", "confidence": 60, "evidence": "Sector reference."},
            {"label": "Competitors", "kind": "competitor", "relationship": "Competitive set in " + center["industry"], "impact": "Pricing and share dynamics.", "confidence": 55, "evidence": "Sector reference."},
            {"label": "Regulators", "kind": "regulation", "relationship": "Primary regulators for " + center["sector"], "impact": "Regulatory shocks reshape mix.", "confidence": 55, "evidence": "Sector reference."},
            {"label": "Macro factors", "kind": "macro", "relationship": "Currency, rates, commodities", "impact": "Second-order sensitivity via inputs and demand.", "confidence": 55, "evidence": "Sector reference."},
        ]
    return {"center": center["name"], "ticker": center["ticker"], "sector": center["sector"], "nodes": nodes}


# ------------------------- Ripple Effects -------------------------
# Each ripple is a causal tree. `direction` is a human hint (↑ / ↓ / mixed).

RIPPLES = [
    {
        "id": "rates-up",
        "title": "Interest Rates ↑",
        "shortLabel": "Rates ↑",
        "kind": "macro",
        "summary": "Fed / RBI hold or hike further. Cost of capital rises.",
        "tree": {
            "label": "Interest rates ↑", "kind": "root", "note": "Higher-for-longer rate regime.",
            "children": [
                {"label": "Cost of capital ↑", "kind": "primary", "note": "Discount rates rise across DCF-heavy names.",
                 "children": [
                    {"label": "Growth-equity multiples compress", "kind": "market", "note": "AI/software names re-rate on higher discount factor.",
                     "affects": ["NVDA", "TSLA", "META"]},
                    {"label": "Enterprise AI RFP cycles elongate", "kind": "market", "note": "Sovereign / enterprise AI decisions get pushed right.",
                     "affects": ["NVDA"]},
                 ]},
                {"label": "Deposit repricing benefits banks", "kind": "primary", "note": "Floating-rate books earn more; unsecured retail pressured.",
                 "children": [
                    {"label": "US bank NII improves", "kind": "market", "note": "JPM/GS net interest income supports EPS.",
                     "affects": ["JPM", "GS"]},
                    {"label": "Indian unsecured growth moderates", "kind": "market", "note": "RBI risk-weights + rate stack compress unsecured retail.",
                     "affects": ["HDFCBANK", "ICICIBANK"]},
                 ]},
                {"label": "Consumer demand cools", "kind": "primary", "note": "Discretionary purchases delayed; K-shaped divergence widens.",
                 "children": [
                    {"label": "Low-income QSR traffic weakens", "kind": "market", "note": "Value-menu resets protect share, compress ticket.",
                     "affects": ["MCD"]},
                    {"label": "Auto payments stretch", "kind": "market", "note": "Financing sensitivity dampens unit growth.",
                     "affects": ["TSLA", "TATAMOTORS"]},
                 ]},
            ],
        },
    },
    {
        "id": "oil-up",
        "title": "Crude Oil ↑",
        "shortLabel": "Oil ↑",
        "kind": "commodity",
        "summary": "Oil breaks above $90/bbl on supply discipline / geopolitics.",
        "tree": {
            "label": "Crude oil ↑", "kind": "root", "note": "Higher energy price regime.",
            "children": [
                {"label": "Input costs ↑ for downstream", "kind": "primary", "note": "Fuel + petchem feedstock costs rise.",
                 "children": [
                    {"label": "QSR / retailer margin pressure", "kind": "market", "note": "Freight & packaging costs bite.",
                     "affects": ["MCD", "WMT", "KO"]},
                    {"label": "Petchem margin squeeze", "kind": "market", "note": "Spreads compress if end-demand doesn't follow.",
                     "affects": ["RELIANCE"]},
                 ]},
                {"label": "Upstream / refiner realisations ↑", "kind": "primary", "note": "O2C cracks widen for integrated players.",
                 "children": [
                    {"label": "RIL O2C EBITDA supports mix", "kind": "market", "note": "Better GRMs offset softness elsewhere.",
                     "affects": ["RELIANCE"]},
                 ]},
                {"label": "Airline / logistics costs ↑", "kind": "primary", "note": "Fuel is the largest variable cost.",
                 "children": [
                    {"label": "Consumer freight prices rise", "kind": "market", "note": "Filters to CPI headline.", "affects": []},
                 ]},
            ],
        },
    },
    {
        "id": "usdinr-up",
        "title": "USD/INR ↑",
        "shortLabel": "USD/INR ↑",
        "kind": "fx",
        "summary": "Rupee weakens against the dollar.",
        "tree": {
            "label": "USD/INR ↑", "kind": "root", "note": "Weaker rupee.",
            "children": [
                {"label": "Indian IT exporters benefit", "kind": "primary", "note": "USD-heavy revenue translates to more INR.",
                 "children": [
                    {"label": "Reported revenue tailwind", "kind": "market", "note": "TCS/Infy INR growth optically improves.",
                     "affects": ["TCS", "INFY"]},
                    {"label": "Margin cushion widens", "kind": "market", "note": "USD revenue vs INR cost base.", "affects": ["TCS", "INFY"]},
                 ]},
                {"label": "Indian importers pressured", "kind": "primary", "note": "USD-denominated imports become costlier.",
                 "children": [
                    {"label": "Crude-import bill rises", "kind": "market", "note": "Downstream margin pressure for O2C.", "affects": ["RELIANCE"]},
                    {"label": "Foreign-debt servicing costs ↑", "kind": "market", "note": "Balance-sheet sensitivity for USD debt.", "affects": []},
                 ]},
                {"label": "FII flows sensitivity", "kind": "primary", "note": "Weaker rupee can slow foreign portfolio inflows.",
                 "children": [
                    {"label": "Indian large-cap valuation risk", "kind": "market", "note": "Multiples wobble on FII flow reversal.", "affects": ["RELIANCE", "HDFCBANK", "ICICIBANK"]},
                 ]},
            ],
        },
    },
    {
        "id": "aicapex-up",
        "title": "AI Capex ↑",
        "shortLabel": "AI capex ↑",
        "kind": "sector",
        "summary": "Hyperscalers reaffirm elevated AI infrastructure spend.",
        "tree": {
            "label": "AI capex ↑", "kind": "root", "note": "Hyperscaler capex commitments extended.",
            "children": [
                {"label": "Accelerator demand rationed", "kind": "primary", "note": "GPU + packaging supply gates volumes.",
                 "children": [
                    {"label": "NVDA DC revenue supports growth", "kind": "market", "note": "Blackwell shipments track packaging capacity.", "affects": ["NVDA"]},
                    {"label": "TSMC advanced packaging capex ↑", "kind": "market", "note": "Second-order supplier beneficiary.", "affects": []},
                 ]},
                {"label": "Power grid becomes binding", "kind": "primary", "note": "Datacenter power availability now the primary constraint.",
                 "children": [
                    {"label": "Utility interconnect timelines stretch", "kind": "market", "note": "Site selection tilts to power-rich geographies.", "affects": []},
                 ]},
                {"label": "Custom silicon gains inference share", "kind": "primary", "note": "Hyperscaler chips move to production.",
                 "children": [
                    {"label": "NVDA inference moat narrows", "kind": "market", "note": "Training moat remains, inference share erodes.", "affects": ["NVDA"]},
                 ]},
            ],
        },
    },
]
