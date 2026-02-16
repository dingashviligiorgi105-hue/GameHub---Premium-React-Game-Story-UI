import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "gh_cart";

function normalizeCart(value) {
  const arr = Array.isArray(value) ? value : [];
  return arr
    .filter((x) => x && x.id != null)
    .map((x) => ({
      ...x,
      qty: Math.max(1, Number(x.qty || 1)),
      price: Number(x.price || 0),
    }));
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = JSON.parse(raw || "[]");
    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  function addToCart(item) {
    if (!item?.id) return;

    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);

      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: Number(x.qty || 0) + 1 } : x
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function inc(id) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Number(x.qty || 0) + 1 } : x))
    );
  }

  function dec(id) {
    setCart((prev) =>
      prev
        .map((x) =>
          x.id === id ? { ...x, qty: Number(x.qty || 0) - 1 } : x
        )
        .filter((x) => Number(x.qty || 0) > 0)
    );
  }

  const totalItems = useMemo(
    () => cart.reduce((s, x) => s + Number(x.qty || 0), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((s, x) => s + Number(x.qty || 0) * Number(x.price || 0), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, inc, dec, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
