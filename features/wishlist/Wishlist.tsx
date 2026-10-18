"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import AddToCartButton from "@/features/cart/AddToCartButton";
import { useCartStore } from "@/features/cart/store";

import { useWishlistStore } from "./store";

export default function Wishlist({ className }: { className?: string }) {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className={cn("p-6 text-sm text-muted-foreground", className)}>
        Loading wishlist…
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
        <Heart className="size-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Your wishlist is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Save products you love and find them here later.
          </p>
        </div>
        <Button asChild>
          <Link href="/products">Discover products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length} saved {items.length === 1 ? "item" : "items"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => items.forEach((item) => addItem(item))}
          >
            <ShoppingCart />
            Add all to cart
          </Button>
          <button
            type="button"
            onClick={clearWishlist}
            className="text-sm text-muted-foreground transition hover:text-destructive"
          >
            Clear
          </button>
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <Link
              href={`/products/${item.slug}`}
              className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </Link>

            <div className="flex-1">
              <Link
                href={`/products/${item.slug}`}
                className="font-medium text-foreground transition hover:text-primary"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.price)}
              </p>
            </div>

            <AddToCartButton product={item} size="sm" variant="outline" />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${item.name} from wishlist`}
              onClick={() => removeItem(item.id)}
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
