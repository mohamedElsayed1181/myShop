import Link from "next/link";
import { Search } from "lucide-react";

import { CartBadge } from "@/features/cart";
import { WishlistBadge } from "@/features/wishlist";

import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Logo className="h-8" />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/products"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/brands"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <form
              action="/products"
              role="search"
              className="relative hidden lg:block"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="q"
                placeholder="Search products…"
                aria-label="Search products"
                className="h-9 w-56 rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </form>

            <Link
              href="/wishlist"
              aria-label="View wishlist"
              className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <WishlistBadge />
            </Link>

            <Link
              href="/cart"
              aria-label="View cart"
              className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <CartBadge />
            </Link>

            <div className="hidden sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 lg:block"
                href="#"
              >
                Register
              </a>
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
