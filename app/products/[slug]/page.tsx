import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { formatPrice } from "@/lib/format";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  ProductGrid,
  StarRating,
} from "@/features/products";
import ProductGallery from "@/features/products/ProductGallery";
import ProductPurchasePanel from "@/features/products/ProductPurchasePanel";
import { getCategoryBySlug } from "@/features/categories";
import { getBrandBySlug } from "@/features/brands";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const brand = getBrandBySlug(product.brand);
  const related = getRelatedProducts(product);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={[product.image, ...product.gallery]}
          alt={product.name}
        />

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {category ? (
              <Link
                href={`/products?category=${category.slug}`}
                className="transition hover:text-foreground"
              >
                {category.name}
              </Link>
            ) : null}
            <span>/</span>
            {brand ? (
              <Link
                href={`/products?brand=${brand.slug}`}
                className="transition hover:text-foreground"
              >
                {brand.name}
              </Link>
            ) : null}
          </div>

          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

          <StarRating rating={product.rating} count={product.reviewCount} />

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice ? (
              <>
                <span className="text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500">
                  Save {discount}%
                </span>
              </>
            ) : null}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {product.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          <ProductPurchasePanel product={product} />

          <ul className="grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Truck className="size-4 text-foreground" />
              Free shipping over $100
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <RotateCcw className="size-4 text-foreground" />
              30-day returns
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="size-4 text-foreground" />
              2-year warranty
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </main>
  );
}
