import type { Metadata } from "next";

import { getAllProducts, SORT_OPTIONS, type SortOption } from "@/features/products";
import { CATEGORIES } from "@/features/categories";
import { BRANDS } from "@/features/brands";
import ProductCatalog from "@/features/products/ProductCatalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the full product catalog.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isSortOption(value: string | undefined): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const products = getAllProducts();

  const initialSearch = firstValue(params.q) ?? "";
  const initialCategory = firstValue(params.category) ?? "all";
  const initialBrand = firstValue(params.brand) ?? "all";
  const sortParam = firstValue(params.sort);
  const initialSort: SortOption = isSortOption(sortParam)
    ? sortParam
    : "featured";

  const key = [initialSearch, initialCategory, initialBrand, initialSort].join(
    "|"
  );

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">All products</h1>
        <p className="mt-1 text-muted-foreground">
          Discover {products.length} products across our catalog.
        </p>
      </div>

      <ProductCatalog
        key={key}
        products={products}
        categories={CATEGORIES}
        brands={BRANDS}
        initialSearch={initialSearch}
        initialCategory={initialCategory}
        initialBrand={initialBrand}
        initialSort={initialSort}
      />
    </main>
  );
}
