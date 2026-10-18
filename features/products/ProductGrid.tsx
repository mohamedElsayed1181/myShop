import { cn } from "@/lib/utils";

import ProductCard from "./ProductCard";
import type { Product } from "./types";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
