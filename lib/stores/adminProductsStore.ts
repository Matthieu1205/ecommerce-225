'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as seedProducts } from '../data/products';

export type AdminCategory = 'Mode' | 'Technologie' | 'Maison' | 'Sport';

export interface AdminProduct {
  id: number;
  name: string;
  price: number;
  category: AdminCategory;
  image: string;
  stock: number;
  brand?: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
}

interface AdminProductsStore {
  items: AdminProduct[];
  add: (input: Omit<AdminProduct, 'id'>) => void;
  update: (id: number, changes: Partial<Omit<AdminProduct, 'id'>>) => void;
  remove: (id: number) => void;
  seedIfEmpty: () => void;
}

export const useAdminProductsStore = create<AdminProductsStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (input) => {
        const nextId = Math.max(0, ...get().items.map((p) => p.id)) + 1;
        const newItem: AdminProduct = { id: nextId, ...input };
        set((state) => ({ items: [newItem, ...state.items] }));
      },
      update: (id, changes) => {
        set((state) => ({
          items: state.items.map((p) => (p.id === id ? { ...p, ...changes } : p)),
        }));
      },
      remove: (id) => {
        set((state) => ({ items: state.items.filter((p) => p.id !== id) }));
      },
      seedIfEmpty: () => {
        const current = get().items;
        if (current.length === 0) {
          const seeded = seedProducts.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category as AdminCategory,
            image: p.image,
            stock: 10,
            brand: undefined,
            description: p.description,
            colors: [],
            sizes: [],
          }));
          set({ items: seeded });
        }
      },
    }),
    { name: 'admin-products-storage' }
  )
);


