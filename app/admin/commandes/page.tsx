"use client";

import { useState } from "react";
import { AdminOrderStatus, useAdminOrdersStore } from "../../../lib/stores/adminOrdersStore";

const statuses: AdminOrderStatus[] = ["pending","processing","shipped","delivered","cancelled"];

export default function AdminOrdersPage() {
  const { items, add, updateStatus } = useAdminOrdersStore();
  const [form, setForm] = useState({ customerName: "", customerEmail: "", total: 0 });

  const onAdd = () => {
    if (!form.customerName || !form.customerEmail || form.total <= 0) return;
    add({ customerName: form.customerName, customerEmail: form.customerEmail, status: "pending", total: form.total, items: [] });
    setForm({ customerName: "", customerEmail: "", total: 0 });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Commandes</h2>
        <div className="flex flex-wrap gap-2 items-end bg-white border border-gray-200 rounded-xl p-3">
          <div>
            <label className="text-xs text-gray-600">Client</label>
            <input aria-label="Nom du client" placeholder="Nom" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="block w-44 px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input aria-label="Email" placeholder="email@exemple.com" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} className="block w-56 px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Total (F CFA)</label>
            <input aria-label="Total" placeholder="0" type="number" value={form.total} onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} className="block w-28 px-2 py-1 border rounded" />
          </div>
          <button onClick={onAdd} className="px-3 py-2 bg-gray-900 text-white rounded">Ajouter</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Créée le</th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3">{o.customerEmail}</td>
                <td className="px-4 py-3">{o.total.toLocaleString()} F CFA</td>
                <td className="px-4 py-3">
                  <select aria-label="Statut" value={o.status} onChange={(e) => updateStatus(o.id, e.target.value as AdminOrderStatus)} className="px-2 py-1 border rounded">
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


