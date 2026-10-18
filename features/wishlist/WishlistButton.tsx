"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/use-hydrated";
import type { Product } from "@/features/products/types";

import { useWishlistStore } from "./store";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export default function WishlistButton({
  product,
  className,
}: WishlistButtonProps) {
  const items = useWishlistStore((state) => state.items);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const hydrated = useHydrated();
  const active = hydrated && items.some((item) => item.id === product.id);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => toggleItem(product)}
      className={cn(
        "rounded-full bg-background/80 backdrop-blur",
        active && "text-red-500",
        className
      )}
    >
      <Heart className={cn(active && "fill-current")} />
    </Button>
  );
}
