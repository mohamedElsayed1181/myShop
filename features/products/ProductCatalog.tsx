"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Category } from "@/features/categories";
import type { Brand } from "@/features/brands";

import ProductGrid from "./ProductGrid";
import { filterProducts, SORT_OPTIONS, type ProductFilters, type SortOption } from "./queries";
import type { Product } from "./types";

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  initialSearch?: string;
  initialCategory?: string;
  initialBrand?: string;
  initialSort?: SortOption;
}

export default function ProductCatalog({
  products,
  categories,
  brands,
  initialSearch = "",
  initialCategory = "all",
  initialBrand = "all",
  initialSort = "featured",
}: ProductCatalogProps) {
  const prices = useMemo(
    () => products.map((product) => product.price),
    [products]
  );
  const bounds = useMemo(
    () => ({
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    }),
    [prices]
  );

  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [maxPrice, setMaxPrice] = useState(bounds.max);

  const results = useMemo(
    () =>
      filterProducts(products, {
        search: query,
        category,
        brand,
        maxPrice,
        sort,
      } satisfies ProductFilters),
    [products, query, category, brand, maxPrice, sort]
  );

  const hasActiveFilters =
    query.trim() !== "" ||
    category !== "all" ||
    brand !== "all" ||
    sort !== "featured" ||
    maxPrice < bounds.max;

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setBrand("all");
    setSort("featured");
    setMaxPrice(bounds.max);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="catalog-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands, categories…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-auto">
          <div>
            <label
              htmlFor="catalog-category"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Category
            </label>
            <select
              id="catalog-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="catalog-brand"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Brand
            </label>
            <select
              id="catalog-brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="all">All brands</option>
              {brands.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="catalog-sort"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Sort by
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="size-4" />
          <span>
            {results.length} {results.length === 1 ? "product" : "products"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="catalog-price"
            className="text-sm text-muted-foreground"
          >
            Max price
          </label>
          <input
            id="catalog-price"
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={5}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-40 accent-primary"
          />
          <span className="w-16 text-sm font-medium text-foreground">
            {formatPrice(maxPrice)}
          </span>

          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              <X />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <ProductGrid products={results} />
    </div>
  );
}
