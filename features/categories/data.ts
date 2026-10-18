const image = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "audio",
    name: "Audio",
    description: "Headphones, earbuds, and speakers for immersive sound.",
    image: image("category-audio"),
  },
  {
    slug: "wearables",
    name: "Wearables",
    description: "Smartwatches and trackers that keep you connected.",
    image: image("category-wearables"),
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Cameras, keyboards, and everyday tech essentials.",
    image: image("category-electronics"),
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Bags, wallets, and gear built for daily carry.",
    image: image("category-accessories"),
  },
  {
    slug: "footwear",
    name: "Footwear",
    description: "Sneakers and boots engineered for comfort and grip.",
    image: image("category-footwear"),
  },
  {
    slug: "home",
    name: "Home & Kitchen",
    description: "Thoughtful essentials for a well-designed home.",
    image: image("category-home"),
  },
  {
    slug: "fitness",
    name: "Fitness",
    description: "Equipment to support your training and recovery.",
    image: image("category-fitness"),
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
