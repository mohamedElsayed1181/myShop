"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";

import { useCartStore } from "./store";
import {
  calculateCartTotals,
  FREE_SHIPPING_THRESHOLD,
} from "./totals";

export default function Cart({ className }: { className?: string }) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const hydrated = useHydrated();

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  if (!hydrated) {
    return (
      <div className={cn("p-6 text-sm text-muted-foreground", className)}>
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-xl border border-dashed border-border p-12 text-center",
          className
        )}
      >
        <ShoppingBag className="size-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse our products and add something you love.
          </p>
        </div>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - totals.subtotal
  );

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1fr_360px]", className)}>
      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-4">
            <Link
              href={`/products/${item.slug}`}
              className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium text-foreground transition hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} each
                  </p>
                </div>
                <p className="font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus />
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 />
                  Remove
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Order summary</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">
              Subtotal ({totals.itemCount} items)
            </dt>
            <dd className="font-medium text-foreground">
              {formatPrice(totals.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-medium text-foreground">
              {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold text-foreground">Total</dt>
            <dd className="font-semibold text-foreground">
              {formatPrice(totals.total)}
            </dd>
          </div>
        </dl>

        {remainingForFreeShipping > 0 ? (
          <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Add {formatPrice(remainingForFreeShipping)} more to unlock free
            shipping.
          </p>
        ) : null}

        <Button asChild className="mt-6 w-full">
          <Link href="/checkout">Proceed to checkout</Link>
        </Button>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            href="/products"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="text-muted-foreground transition hover:text-destructive"
          >
            Clear cart
          </button>
        </div>
      </aside>
    </div>
  );
}
