import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllProducts } from "@/features/products";
import { BRANDS } from "@/features/brands";

export const metadata: Metadata = {
  title: "Brands",
  description: "Shop products by brand.",
};

export default function BrandsPage() {
  const products = getAllProducts();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Brands</h1>
        <p className="mt-1 text-muted-foreground">
          Discover the makers behind our products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((brand) => {
          const count = products.filter(
            (product) => product.brand === brand.slug
          ).length;

          return (
            <Link
              key={brand.slug}
              href={`/products?brand=${brand.slug}`}
              className="group flex flex-col justify-between gap-6 rounded-xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                  {brand.name.charAt(0)}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {brand.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {brand.description}
                </p>
              </div>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {count} {count === 1 ? "product" : "products"}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
