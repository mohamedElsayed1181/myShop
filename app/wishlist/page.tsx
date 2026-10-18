import type { Metadata } from "next";

import { Wishlist } from "@/features/wishlist";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products you have saved for later.",
};

export default function WishlistPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Your wishlist</h1>
      <Wishlist />
    </main>
  );
}
