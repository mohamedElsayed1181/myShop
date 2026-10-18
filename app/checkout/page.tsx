import type { Metadata } from "next";

import { Checkout } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Checkout</h1>
      <Checkout />
    </main>
  );
}
