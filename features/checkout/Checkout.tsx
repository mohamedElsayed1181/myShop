"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, CreditCard, Lock, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCartStore } from "@/features/cart/store";
import { calculateCartTotals } from "@/features/cart/totals";

interface CheckoutFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const inputClass =
  "h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
const errorClass = "mt-1 text-xs text-destructive";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const hydrated = useHydrated();
  const [orderId, setOrderId] = useState<string | null>(null);
  const orderNumber = useId().replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({ mode: "onBlur" });

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  async function onSubmit() {
    // No backend yet: simulate order placement, then clear the cart.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOrderId(`ORD-${orderNumber}`);
    clearCart();
  }

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading checkout…</p>;
  }

  if (orderId) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-12 text-green-500" />
        <h2 className="text-2xl font-bold text-foreground">Order confirmed</h2>
        <p className="text-muted-foreground">
          Thank you! Your order{" "}
          <span className="font-medium text-foreground">{orderId}</span> has
          been placed.
        </p>
        <Button asChild className="mt-2">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-xl border border-dashed border-border p-12 text-center">
        <ShoppingBag className="size-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add products to your cart before checking out.
          </p>
        </div>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-8 lg:grid-cols-[1fr_360px]"
      noValidate
    >
      <div className="flex flex-col gap-8">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Contact details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className={labelClass}>
                Full name
              </label>
              <input
                id="fullName"
                className={inputClass}
                autoComplete="name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName ? (
                <p className={errorClass}>{errors.fullName.message}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email ? (
                <p className={errorClass}>{errors.email.message}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Shipping address
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="address" className={labelClass}>
                Address
              </label>
              <input
                id="address"
                className={inputClass}
                autoComplete="street-address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address ? (
                <p className={errorClass}>{errors.address.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                className={inputClass}
                autoComplete="address-level2"
                {...register("city", { required: "City is required" })}
              />
              {errors.city ? (
                <p className={errorClass}>{errors.city.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="postalCode" className={labelClass}>
                Postal code
              </label>
              <input
                id="postalCode"
                className={inputClass}
                autoComplete="postal-code"
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
              />
              {errors.postalCode ? (
                <p className={errorClass}>{errors.postalCode.message}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                id="country"
                className={inputClass}
                autoComplete="country-name"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country ? (
                <p className={errorClass}>{errors.country.message}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <CreditCard className="size-5" />
            Payment
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Demo checkout only — no real payment is processed.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="cardNumber" className={labelClass}>
                Card number
              </label>
              <input
                id="cardNumber"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                className={inputClass}
                autoComplete="cc-number"
                {...register("cardNumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^\d{12,19}$/,
                    message: "Enter a valid card number",
                  },
                })}
              />
              {errors.cardNumber ? (
                <p className={errorClass}>{errors.cardNumber.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="expiry" className={labelClass}>
                Expiry (MM/YY)
              </label>
              <input
                id="expiry"
                placeholder="12/28"
                className={inputClass}
                autoComplete="cc-exp"
                {...register("expiry", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Use MM/YY format",
                  },
                })}
              />
              {errors.expiry ? (
                <p className={errorClass}>{errors.expiry.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="cvc" className={labelClass}>
                CVC
              </label>
              <input
                id="cvc"
                inputMode="numeric"
                placeholder="123"
                className={inputClass}
                autoComplete="cc-csc"
                {...register("cvc", {
                  required: "CVC is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "Enter a valid CVC",
                  },
                })}
              />
              {errors.cvc ? (
                <p className={errorClass}>{errors.cvc.message}</p>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Order summary</h2>

        <ul className="mt-4 flex flex-col gap-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span className="text-muted-foreground">
                {item.name}
                <span className="text-foreground"> × {item.quantity}</span>
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium text-foreground">
              {formatPrice(totals.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-medium text-foreground">
              {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold text-foreground">Total</dt>
            <dd className="font-semibold text-foreground">
              {formatPrice(totals.total)}
            </dd>
          </div>
        </dl>

        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
          <Lock />
          {isSubmitting ? "Placing order…" : "Place order"}
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Your information is only used for this demo.
        </p>
      </aside>
    </form>
  );
}
