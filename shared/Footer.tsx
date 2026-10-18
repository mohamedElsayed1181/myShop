import type { ReactNode } from "react";
import Link from "next/link";

import { CATEGORIES } from "@/features/categories";
import { BRANDS } from "@/features/brands";

import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const SHOP_LINKS = [
  { label: "All products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Wishlist", href: "/wishlist" },
];

const SUPPORT_LINKS = [
  { label: "Shopping cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Shipping & delivery", href: "#" },
  { label: "Returns & refunds", href: "#" },
  { label: "Warranty", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookies", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
];

const YEAR = new Date().getFullYear();

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const className =
    "text-muted-foreground transition hover:text-foreground";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-teal-600"
            >
              <Logo className="h-8" />
              <span className="text-lg font-bold text-foreground">MyShop</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Everyday gear, thoughtfully designed. Audio, wearables, and home
              essentials built to last — with free shipping on orders over $100.
            </p>

            <div className="mt-6 max-w-sm">
              <h2 className="text-sm font-semibold text-foreground">
                Join our newsletter
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Product news and exclusive offers, no spam.
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
          >
            <div>
              <h2 className="text-sm font-semibold text-foreground">Shop</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {SHOP_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Categories
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {CATEGORIES.slice(0, 5).map((category) => (
                  <li key={category.slug}>
                    <FooterLink href={`/products?category=${category.slug}`}>
                      {category.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground">Brands</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {BRANDS.map((brand) => (
                  <li key={brand.slug}>
                    <FooterLink href={`/products?brand=${brand.slug}`}>
                      {brand.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground">Support</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {YEAR} MyShop. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-4 text-xs">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
