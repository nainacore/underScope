import { useEffect, useState, useCallback } from "react";

const KEY = "underscope:watchlist";

const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
};

const write = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("underscope:watchlist-changed"));
};

export const useWatchlist = () => {
  const [list, setList] = useState(read);

  useEffect(() => {
    const handler = () => setList(read());
    window.addEventListener("underscope:watchlist-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("underscope:watchlist-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const add = useCallback((ticker) => {
    const next = Array.from(new Set([...read(), ticker.toUpperCase()]));
    write(next);
  }, []);
  const remove = useCallback((ticker) => {
    const next = read().filter((t) => t !== ticker.toUpperCase());
    write(next);
  }, []);
  const has = useCallback((ticker) => read().includes(ticker.toUpperCase()), []);
  const toggle = useCallback((ticker) => {
    const t = ticker.toUpperCase();
    if (read().includes(t)) remove(t);
    else add(t);
  }, [add, remove]);

  return { list, add, remove, has, toggle };
};
