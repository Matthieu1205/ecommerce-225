'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdminOrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface AdminOrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  status: AdminOrderStatus;
  total: number;
  createdAt: string;
  items: AdminOrderItem[];
}

interface AdminOrdersStore {
  items: AdminOrder[];
  add: (order: Omit<AdminOrder, 'id' | 'createdAt'>) => void;
  updateStatus: (id: string, status: AdminOrderStatus) => void;
}

export const useAdminOrdersStore = create<AdminOrdersStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (order) => {
        const id = `order_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
        const createdAt = new Date().toISOString();
        set((state) => ({ items: [{ id, createdAt, ...order }, ...state.items] }));
      },
      updateStatus: (id, status) => {
        set((state) => ({
          items: state.items.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },
    }),
    { name: 'admin-orders-storage' }
  )
);


