import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, X, Loader2 } from "lucide-react";
import { streamAssistant } from "@/lib/api";

const SESSION_KEY = "underscope:assistant-session";

const getSession = () => {
  let s = localStorage.getItem(SESSION_KEY);
  if (!s) {
    s = `us-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    localStorage.setItem(SESSION_KEY, s);
  }
  return s;
};

const MD_COMPONENTS = {
  table: (props) => (
    <div className="md-table-wrap">
      <table {...props} />
    </div>
  ),
};

const SUGGESTED = [
  "What are the biggest dependencies?",
  "What changed in the last two earnings?",
  "What risks are increasing?",
  "What does management say vs the numbers?",
  "What could hurt this company if rates rise?",
];

export const AssistantPanel = ({ open, onClose, ticker, companyName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const ask = async (question) => {
    if (!question.trim() || streaming) return;
    setStreaming(true);
    const q = question.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: "" }]);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    await streamAssistant({
      ticker,
      question: q,
      sessionId: getSession(),
      signal: ctrl.signal,
      onDelta: (d) =>
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: copy[copy.length - 1].text + d };
          return copy;
        }),
      onDone: () => setStreaming(false),
      onError: (e) => {
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          const existing = last?.text || "";
          copy[copy.length - 1] = {
            role: "assistant",
            text: existing ? `${existing}\n\n⚠︎ ${e.message || "Assistant unavailable"}` : `⚠︎ ${e.message || "Assistant unavailable"}`,
          };
          return copy;
        });
        setStreaming(false);
      },
    });
  };

  const stop = () => {
    abortRef.current?.abort();
    setStreaming(false);
  };

  if (!open) return null;

  return (
    <aside
      className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-white border-l border-slate-200 z-50 flex flex-col shadow-xl"
      role="dialog"
      aria-label="AI Research Assistant"
      data-testid="assistant-panel"
    >
      <header className="border-b border-slate-200 px-5 py-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-mono-num">
            <Sparkles size={12} /> UnderScope Research Analyst
          </div>
          <h2 className="font-editorial text-2xl text-slate-900 leading-tight mt-1">
            {companyName ? `Investigating ${companyName}` : "Ask a research question"}
          </h2>
          {ticker ? (
            <div className="mt-1 text-xs font-mono-num text-slate-500">Context · {ticker}</div>
          ) : (
            <div className="mt-1 text-xs text-slate-500">Open from any company page for grounded context.</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-900"
          data-testid="assistant-close"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </header>

      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-5 space-y-5">
          {messages.length === 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono-num">Suggested</div>
              <div className="flex flex-col gap-2">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => ask(s)}
                    className="text-left border border-slate-200 bg-white hover:border-slate-400 px-3 py-2 text-sm text-slate-800"
                    data-testid={`assistant-suggestion-${i}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                Answers are informational research, not investment advice. Distinguishes FACT / SOURCE / AI INTERPRETATION / SCENARIO.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "" : "border-l-2 border-slate-900 pl-3"}>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono-num">
                {m.role === "user" ? "You" : "Analyst"}
              </div>
              <div className={`text-sm text-slate-800 leading-relaxed assistant-stream ${m.role === "user" ? "whitespace-pre-wrap" : ""}`}>
                {m.role === "assistant" && m.text ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>{m.text}</ReactMarkdown>
                ) : (
                  m.text || (streaming && i === messages.length - 1 ? "…" : "")
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-slate-200 p-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ticker ? `Ask about ${ticker}…` : "Ask a research question…"}
          rows={3}
          className="mb-2 font-sans text-sm"
          data-testid="assistant-input"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask(input);
          }}
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-500 font-mono-num">⌘ + ↵ to send</span>
          {streaming ? (
            <Button variant="outline" size="sm" onClick={stop} data-testid="assistant-stop">
              <Loader2 size={14} className="animate-spin mr-1" /> Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => ask(input)}
              disabled={!input.trim()}
              className="bg-slate-900 hover:bg-slate-800 text-white"
              data-testid="assistant-send"
            >
              <Send size={14} className="mr-1" /> Ask
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};
