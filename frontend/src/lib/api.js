import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API, timeout: 30000 });

export const api = {
  listCompanies: (params = {}) => client.get("/companies", { params }).then((r) => r.data),
  getCompany: (t) => client.get(`/companies/${t}`).then((r) => r.data),
  getPriceHistory: (t) => client.get(`/companies/${t}/price-history`).then((r) => r.data),
  getFinancials: (t) => client.get(`/companies/${t}/financials`).then((r) => r.data),
  getInvestigations: (t) => client.get(`/companies/${t}/investigations`).then((r) => r.data),
  getNews: (t) => client.get(`/companies/${t}/news`).then((r) => r.data),
  getEvents: (t) => client.get(`/companies/${t}/events`).then((r) => r.data),
  getDependencies: (t) => client.get(`/companies/${t}/dependencies`).then((r) => r.data),
  getMarketOverview: () => client.get("/market/overview").then((r) => r.data),
  getTrending: () => client.get("/market/trending").then((r) => r.data),
  getSignals: () => client.get("/market/signals").then((r) => r.data),
  compare: (tickers) => client.post("/compare", { tickers }).then((r) => r.data),
  askAssistantURL: () => `${API}/assistant/ask`,
};

export const streamAssistant = async ({ ticker, question, sessionId, onDelta, onDone, onError, signal }) => {
  try {
    const res = await fetch(`${API}/assistant/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker, question, session_id: sessionId }),
      signal,
    });
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => "");
      onError?.(new Error(text || `HTTP ${res.status}`));
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      // Parse SSE frames separated by double newlines
      let idx;
      while ((idx = buffer.indexOf("\n\n")) !== -1) {
        const frame = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        const lines = frame.split("\n");
        let event = "message";
        let data = "";
        for (const l of lines) {
          if (l.startsWith("event:")) event = l.slice(6).trim();
          else if (l.startsWith("data:")) data += (data ? "\n" : "") + l.slice(5).replace(/^ /, "");
        }
        if (event === "done") {
          onDone?.();
          return;
        } else if (event === "error") {
          try {
            const p = JSON.parse(data);
            onError?.(new Error(p.error || data));
          } catch (_e) {
            onError?.(new Error(data));
          }
          return;
        } else if (data) {
          try {
            const p = JSON.parse(data);
            if (p && typeof p.t === "string") {
              onDelta?.(p.t);
              continue;
            }
          } catch (_e) {
            // legacy plain text – pass through
          }
          onDelta?.(data);
        }
      }
    }
    onDone?.();
  } catch (e) {
    if (e.name !== "AbortError") onError?.(e);
  }
};
