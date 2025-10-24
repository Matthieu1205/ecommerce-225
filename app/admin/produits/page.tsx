"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { useAdminProductsStore, AdminCategory } from "../../../lib/stores/adminProductsStore";

async function compressImageFile(file: File, maxDimension: number = 1024, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : "";
      if (!src) {
        reject(new Error("Lecture du fichier échouée"));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const targetW = Math.max(1, Math.round(img.width * scale));
        const targetH = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas non supporté"));
          return;
        }
        ctx.drawImage(img, 0, 0, targetW, targetH);
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(e);
      img.src = src;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

export default function AdminProductsPage() {
  const { items, add, update, remove, seedIfEmpty } = useAdminProductsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "Mode" as AdminCategory,
    image: "",
    stock: 0,
    brand: "",
    description: "",
    colors: "",
    sizes: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    seedIfEmpty();
  }, [seedIfEmpty]);

  const isFormValid = !!form.name.trim() && form.price > 0 && !!form.image.trim();

  const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    compressImageFile(file, 1024, 0.8)
      .then((dataUrl) => {
        setForm((prev) => ({ ...prev, image: dataUrl }));
      })
      .catch(() => {
        // fallback: lecture brute si compression échoue
        const reader = new FileReader();
        reader.onload = () => {
          const result = typeof reader.result === "string" ? reader.result : "";
          if (result) setForm((prev) => ({ ...prev, image: result }));
        };
        reader.readAsDataURL(file);
      });
  };

  const handleSubmit = () => {
    if (!form.name || form.price <= 0 || !form.image) return;
    const colorsArr = form.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const sizesArr = form.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    add({
      name: form.name,
      price: form.price,
      category: form.category,
      image: form.image,
      stock: form.stock,
      brand: form.brand || undefined,
      description: form.description || undefined,
      colors: colorsArr,
      sizes: sizesArr,
    });
    setIsAdding(false);
    setForm({ name: "", price: 0, category: "Mode", image: "", stock: 0, brand: "", description: "", colors: "", sizes: "" });
  };

  const startEdit = (id: number) => {
    const p = items.find((x) => x.id === id);
    if (!p) return;
    setEditingId(id);
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      stock: p.stock,
      brand: p.brand || "",
      description: p.description || "",
      colors: (p.colors || []).join(', '),
      sizes: (p.sizes || []).join(', '),
    });
  };

  const saveEdit = () => {
    if (editingId == null) return;
    const colorsArr = form.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const sizesArr = form.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    update(editingId, {
      name: form.name,
      price: form.price,
      category: form.category,
      image: form.image,
      stock: form.stock,
      brand: form.brand || undefined,
      description: form.description || undefined,
      colors: colorsArr,
      sizes: sizesArr,
    });
    setEditingId(null);
    setForm({ name: "", price: 0, category: "Mode", image: "", stock: 0, brand: "", description: "", colors: "", sizes: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Produits</h2>
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Ajouter un produit</button>
        ) : (
          <div className="flex flex-wrap gap-2 items-end bg-white border border-gray-200 rounded-xl p-3">
            <div>
              <label className="text-xs text-gray-600">Nom</label>
              <input aria-label="Nom du produit" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="block w-44 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Prix</label>
              <input aria-label="Prix" placeholder="0" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="block w-28 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Catégorie</label>
              <select aria-label="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as AdminCategory })} className="block w-36 px-2 py-1 border rounded">
                {(["Mode","Technologie","Maison","Sport"] as AdminCategory[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">Image (fichier ou URL)</label>
              <div className="flex items-center gap-2">
                <input aria-label="URL de l'image" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="block w-64 px-2 py-1 border rounded" />
                <input id="admin-product-image-file" ref={fileInputRef} type="file" accept="image/*" onChange={onImageFileChange} className="hidden" aria-label="Sélectionner une image" title="Sélectionner une image" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2 py-1 border rounded">Choisir un fichier</button>
              </div>
              {form.image && (
                <div className="mt-1">
                  <img src={form.image} alt="Aperçu" className="w-16 h-16 object-cover rounded border" />
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-600">Marque</label>
              <input aria-label="Marque" placeholder="Marque" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="block w-40 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Description courte</label>
              <input aria-label="Description" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="block w-72 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Couleurs (séparées par des virgules)</label>
              <input aria-label="Couleurs" placeholder="rouge, noir" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="block w-64 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Tailles (séparées par des virgules)</label>
              <input aria-label="Tailles" placeholder="S, M, L" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="block w-48 px-2 py-1 border rounded" />
            </div>
            <button type="button" onClick={handleSubmit} disabled={!isFormValid} className={`px-3 py-2 rounded text-white ${isFormValid ? "bg-green-600" : "bg-green-600 opacity-50 cursor-not-allowed"}`}>Enregistrer</button>
            <button type="button" onClick={() => { setIsAdding(false); setForm({ name: "", price: 0, category: "Mode", image: "", stock: 0, brand: "", description: "", colors: "", sizes: "" }); }} className="px-3 py-2 border rounded">Annuler</button>
            {!isFormValid && (
              <div className="w-full text-xs text-red-600 mt-1">Veuillez renseigner Nom, Prix (&gt; 0) et Image.</div>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Couleurs</th>
              <th className="px-4 py-3">Tailles</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t align-top">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Nom du produit" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-56 px-2 py-1 border rounded" />
                ) : p.name}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <select aria-label="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as AdminCategory })} className="w-40 px-2 py-1 border rounded">
                    {(["Mode","Technologie","Maison","Sport"] as AdminCategory[]).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : p.category}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Prix" placeholder="0" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-28 px-2 py-1 border rounded" />
                ) : `${p.price.toLocaleString()} F CFA`}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Stock" placeholder="0" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="w-24 px-2 py-1 border rounded" />
                ) : p.stock}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Marque" placeholder="Marque" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-40 px-2 py-1 border rounded" />
                ) : (p.brand || '-')}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Couleurs" placeholder="rouge, noir" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="w-48 px-2 py-1 border rounded" />
                ) : (p.colors && p.colors.length ? p.colors.join(', ') : '-')}</td>
                <td className="px-4 py-3">{editingId === p.id ? (
                  <input aria-label="Tailles" placeholder="S, M, L" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="w-40 px-2 py-1 border rounded" />
                ) : (p.sizes && p.sizes.length ? p.sizes.join(', ') : '-')}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Link href={`/product?id=${p.id}`} className="text-blue-600 hover:underline">Voir</Link>
                  {editingId === p.id ? (
                    <>
                      <button onClick={saveEdit} className="text-green-700 hover:underline">Sauver</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-700 hover:underline">Annuler</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(p.id)} className="text-gray-700 hover:underline">Modifier</button>
                      <button onClick={() => remove(p.id)} className="text-red-600 hover:underline">Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


