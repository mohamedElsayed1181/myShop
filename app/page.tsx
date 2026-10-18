import Link from "next/link";
import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/features/products";
import ProductGrid from "@/features/products/ProductGrid";
import { CATEGORIES } from "@/features/categories";
import CategoryCard from "@/features/categories/CategoryCard";

export default function Home() {
  const featured = getFeaturedProducts(8);

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Package className="size-3.5" />
              New season essentials
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Everyday gear, thoughtfully designed
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Discover audio, wearables, and home essentials built to last.
              Free shipping on orders over $100.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  Shop all products
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/categories">Browse categories</Link>
              </Button>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
            <li className="rounded-xl border border-border bg-background p-6">
              <Truck className="size-6 text-primary" />
              <p className="mt-3 font-medium text-foreground">Free shipping</p>
              <p className="mt-1 text-sm text-muted-foreground">
                On all orders over $100
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background p-6">
              <ShieldCheck className="size-6 text-primary" />
              <p className="mt-3 font-medium text-foreground">2-year warranty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Quality you can trust
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background p-6">
              <Package className="size-6 text-primary" />
              <p className="mt-3 font-medium text-foreground">Easy returns</p>
              <p className="mt-1 text-sm text-muted-foreground">
                30-day return window
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Shop by category</h2>
            <p className="mt-1 text-muted-foreground">
              Find exactly what you need.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden shrink-0 text-sm font-medium text-primary transition hover:underline sm:block"
          >
            View all
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.slice(0, 4).map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Featured products
              </h2>
              <p className="mt-1 text-muted-foreground">
                Handpicked favorites from our catalog.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 text-sm font-medium text-primary transition hover:underline sm:block"
            >
              Shop all
            </Link>
          </div>

          <div className="mt-6">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>
    </main>
  );
}
