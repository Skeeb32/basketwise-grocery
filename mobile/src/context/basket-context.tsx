import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type Basket = Record<string, number>;
type BasketContextValue = {
  basket: Basket;
  watchlist: string[];
  appliedCoupon: string | null;
  addToBasket: (id: string) => void;
  removeFromBasket: (id: string) => void;
  toggleWatch: (id: string) => void;
  applyCoupon: (code: string | null) => void;
};

const BasketContext = createContext<BasketContextValue | null>(null);

export function BasketProvider({ children }: PropsWithChildren) {
  const [basket, setBasket] = useState<Basket>({});
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const value = useMemo<BasketContextValue>(() => ({
    basket,
    watchlist,
    appliedCoupon,
    addToBasket: (id) => setBasket((current) => ({ ...current, [id]: (current[id] || 0) + 1 })),
    removeFromBasket: (id) => setBasket((current) => {
      const next = { ...current };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    }),
    toggleWatch: (id) => setWatchlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    applyCoupon: setAppliedCoupon,
  }), [basket, watchlist, appliedCoupon]);

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) throw new Error('useBasket must be used inside BasketProvider');
  return context;
}
