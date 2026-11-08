import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'quatrea-bag';
const BagContext = createContext(null);

const readStored = () => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * A lightweight front-end bag. It demonstrates the "Add to Bag" flow only —
 * there is no checkout or payment backend in this project.
 */
export function BagProvider({ children }) {
  const [items, setItems] = useState(readStored);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — the bag simply won't persist */
    }
  }, [items]);

  const add = useCallback((slug, size) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === slug && item.size === size);
      if (existing) {
        return prev.map((item) => (item === existing ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { slug, size, qty: 1 }];
    });
  }, []);

  const remove = useCallback((slug, size) => {
    setItems((prev) => prev.filter((item) => !(item.slug === slug && item.size === size)));
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.qty, 0),
      add,
      remove,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [items, add, remove, isOpen],
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside <BagProvider>');
  return ctx;
}
