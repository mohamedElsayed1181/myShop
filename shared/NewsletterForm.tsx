"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return (
      <p className="text-sm text-teal-600">
        Thanks for subscribing! Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <Button type="submit" className="shrink-0">
        <Send />
        Subscribe
      </Button>
    </form>
  );
}
