export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured?: boolean;
}
