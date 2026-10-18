"use client";

import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/use-hydrated";

import { useCartStore } from "./store";

export default function CartBadge({ className }: { className?: string }) {
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const hydrated = useHydrated();

  return (
    <span
      className={cn("relative inline-flex", className)}
      aria-label={`${hydrated ? count : 0} items in cart`}
    >
      <ShoppingCart className="size-5" />
      {hydrated && count > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </span>
  );
}
