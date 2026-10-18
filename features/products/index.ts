export type { Product } from "./types";
export { PRODUCTS } from "./data";
export {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  getPriceRange,
  filterProducts,
  SORT_OPTIONS,
} from "./queries";
export type { ProductFilters, SortOption } from "./queries";
export { default as ProductCard } from "./ProductCard";
export { default as ProductGrid } from "./ProductGrid";
export { default as ProductCatalog } from "./ProductCatalog";
export { default as StarRating } from "./StarRating";
