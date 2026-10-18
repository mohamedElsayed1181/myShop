"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/use-hydrated";

import { useWishlistStore } from "./store";

export default function WishlistBadge({ className }: { className?: string }) {
  const count = useWishlistStore((state) => state.items.length);
  const hydrated = useHydrated();

  return (
    <span
      className={cn("relative inline-flex", className)}
      aria-label={`${hydrated ? count : 0} items in wishlist`}
    >
      <Heart className="size-5" />
      {hydrated && count > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </span>
  );
}
