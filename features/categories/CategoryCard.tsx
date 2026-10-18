import Image from "next/image";
import Link from "next/link";

import type { Category } from "./data";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative flex h-48 flex-col justify-end overflow-hidden rounded-xl border border-border"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
      <div className="relative p-4 text-white">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="mt-1 text-sm text-white/80">{category.description}</p>
      </div>
    </Link>
  );
}
