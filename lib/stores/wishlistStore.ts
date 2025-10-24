'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) return;
        set((state) => ({ items: [...state.items, item] }));
      },
      remove: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
      has: (id) => get().items.some((i) => i.id === id),
      clear: () => set({ items: [] }),
      count: () => get().items.length,
    }),
    { name: 'wishlist-storage' }
  )
);


