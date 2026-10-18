export interface Brand {
  slug: string;
  name: string;
  description: string;
}

export const BRANDS: Brand[] = [
  {
    slug: "aurora",
    name: "Aurora",
    description: "Premium audio and smart-lighting crafted for everyday use.",
  },
  {
    slug: "northwind",
    name: "Northwind",
    description: "Outdoor-ready gear and home essentials built to last.",
  },
  {
    slug: "lumen",
    name: "Lumen",
    description: "Connected wearables and wellness devices.",
  },
  {
    slug: "vertex",
    name: "Vertex",
    description: "Performance footwear and action-ready cameras.",
  },
  {
    slug: "cascade",
    name: "Cascade",
    description: "Optics, peripherals, and modern home tools.",
  },
  {
    slug: "nomad",
    name: "Nomad",
    description: "Minimalist leather goods for the modern traveler.",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((brand) => brand.slug === slug);
}
