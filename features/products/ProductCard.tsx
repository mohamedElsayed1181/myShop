import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "@/features/cart/AddToCartButton";
import WishlistButton from "@/features/wishlist/WishlistButton";

import StarRating from "./StarRating";
import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const inStock = product.stock > 0;
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
          aria-label={product.name}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>

        {discount > 0 ? (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            -{discount}%
          </span>
        ) : null}

        <WishlistButton product={product} className="absolute right-2 top-2" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>          <h3 className="mt-0.5 font-medium text-foreground">
            <Link
              href={`/products/${product.slug}`}
              className="transition hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>
          <StarRating
            rating={product.rating}
            count={product.reviewCount}
            className="mt-1.5"
          />
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>

        <AddToCartButton
          product={product}
          size="sm"
          disabled={!inStock}
          className="w-full"
        />
      </div>
    </div>
  );
}
