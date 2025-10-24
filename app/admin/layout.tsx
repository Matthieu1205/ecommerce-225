"use client";

import Link from "next/link";
import AdminGuard from "../../components/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Back Office</h1>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="hover:underline">Tableau de bord</Link>
              <Link href="/admin/produits" className="hover:underline">Produits</Link>
              <Link href="/admin/commandes" className="hover:underline">Commandes</Link>
              <Link href="/admin/clients" className="hover:underline">Clients</Link>
              <Link href="/" className="text-gray-600 hover:underline">Retour au site</Link>
            </nav>
          </div>
        </div>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </div>
    </AdminGuard>
  );
}


