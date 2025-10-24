'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface AdminClientsStore {
  items: AdminClient[];
  add: (client: Omit<AdminClient, 'id' | 'createdAt'>) => void;
  remove: (id: string) => void;
}

export const useAdminClientsStore = create<AdminClientsStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (client) => {
        const id = `client_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
        const createdAt = new Date().toISOString();
        set((state) => ({ items: [{ id, createdAt, ...client }, ...state.items] }));
      },
      remove: (id) => {
        set((state) => ({ items: state.items.filter((c) => c.id !== id) }));
      },
    }),
    { name: 'admin-clients-storage' }
  )
);


