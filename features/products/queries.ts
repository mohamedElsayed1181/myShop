import { PRODUCTS } from "./data";
import type { Product } from "./types";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "name";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return PRODUCTS.filter((product) => product.featured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const sameBrand = PRODUCTS.filter(
    (item) =>
      item.brand === product.brand &&
      item.id !== product.id &&
      !sameCategory.some((entry) => entry.id === item.id)
  );

  return [...sameCategory, ...sameBrand].slice(0, limit);
}

export function getPriceRange(): { min: number; max: number } {
  const prices = PRODUCTS.map((product) => product.price);
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      );
  }
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters = {}
): Product[] {
  const { search, category, brand, minPrice, maxPrice, sort = "featured" } = filters;

  const term = search?.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (category && category !== "all" && product.category !== category) {
      return false;
    }

    if (brand && brand !== "all" && product.brand !== brand) {
      return false;
    }

    if (typeof minPrice === "number" && product.price < minPrice) {
      return false;
    }

    if (typeof maxPrice === "number" && product.price > maxPrice) {
      return false;
    }

    if (term) {
      const haystack = [
        product.name,
        product.description,
        product.category,
        product.brand,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(term)) {
        return false;
      }
    }

    return true;
  });

  return sortProducts(filtered, sort);
}
