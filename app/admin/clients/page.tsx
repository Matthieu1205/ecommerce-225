"use client";

import { useState } from "react";
import { useAdminClientsStore } from "../../../lib/stores/adminClientsStore";

export default function AdminClientsPage() {
  const { items, add, remove } = useAdminClientsStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const onAdd = () => {
    if (!form.name || !form.email) return;
    add({ name: form.name, email: form.email, phone: form.phone || undefined });
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <div className="flex flex-wrap gap-2 items-end bg-white border border-gray-200 rounded-xl p-3">
          <div>
            <label className="text-xs text-gray-600">Nom</label>
            <input aria-label="Nom" placeholder="Client" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="block w-44 px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input aria-label="Email" placeholder="email@exemple.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="block w-56 px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Téléphone</label>
            <input aria-label="Téléphone" placeholder="+225..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="block w-40 px-2 py-1 border rounded" />
          </div>
          <button onClick={onAdd} className="px-3 py-2 bg-gray-900 text-white rounded">Ajouter</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Créé le</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.id}</td>
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone || '-'}</td>
                <td className="px-4 py-3">{new Date(c.createdAt).toLocaleString('fr-FR')}</td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(c.id)} className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


