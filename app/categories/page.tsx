import type { Metadata } from "next";

import { CATEGORIES } from "@/features/categories";
import CategoryCard from "@/features/categories/CategoryCard";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse products by category.",
};

export default function CategoriesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="mt-1 text-muted-foreground">
          Explore {CATEGORIES.length} categories of curated products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </main>
  );
}
