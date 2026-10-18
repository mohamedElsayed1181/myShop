"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/features/products/types";

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);

          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
