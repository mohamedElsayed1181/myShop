"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import AddToCartButton from "@/features/cart/AddToCartButton";
import WishlistButton from "@/features/wishlist/WishlistButton";

import type { Product } from "./types";

export default function ProductPurchasePanel({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;
  const maxQuantity = Math.max(1, Math.min(product.stock, 10));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Decrease quantity"
            disabled={!inStock || quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            <Minus />
          </Button>
          <span className="w-10 text-center text-sm tabular-nums">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Increase quantity"
            disabled={!inStock || quantity >= maxQuantity}
            onClick={() =>
              setQuantity((value) => Math.min(maxQuantity, value + 1))
            }
          >
            <Plus />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground">
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size="lg"
          disabled={!inStock}
          className="flex-1"
        />
        <WishlistButton product={product} />
      </div>
    </div>
  );
}
