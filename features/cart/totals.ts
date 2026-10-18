import type { CartItem } from "./store";

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FLAT_RATE = 9.99;

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FLAT_RATE;

  return {
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}
