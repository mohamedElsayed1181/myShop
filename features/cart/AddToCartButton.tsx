"use client";

import type { ComponentProps } from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types";

import { useCartStore } from "./store";

interface AddToCartButtonProps extends ComponentProps<typeof Button> {
  product: Product;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  ...props
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button type="button" onClick={() => addItem(product, quantity)} {...props}>
      <ShoppingCart />
      Add to cart
    </Button>
  );
}
