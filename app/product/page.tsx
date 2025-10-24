"use client";

import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetailClient from "../../components/ProductDetailClient";
import { products as dataProducts, ProductItem } from "../../lib/data/products";
import { useMemo } from "react";
import { useAdminProductsStore } from "../../lib/stores/adminProductsStore";

export default function ProductDynamicPage() {
  const params = useSearchParams();
  const idStr = params.get("id") || "";
  const id = Number(idStr);
  const { items: adminItems } = useAdminProductsStore();

  const product: ProductItem | undefined = useMemo(() => {
    if (Number.isNaN(id)) return undefined;
    const fromData = dataProducts.find((p) => p.id === id);
    if (fromData) return fromData;
    const fromAdmin = adminItems.find((p) => p.id === id);
    if (!fromAdmin) return undefined;
    // Adapter AdminProduct -> ProductItem (champs compatibles)
    return {
      id: fromAdmin.id,
      name: fromAdmin.name,
      price: fromAdmin.price,
      category: fromAdmin.category as any,
      image: fromAdmin.image,
      rating: 5,
      reviews: 0,
      description: fromAdmin.description,
      brand: fromAdmin.brand,
      colors: fromAdmin.colors,
      sizes: fromAdmin.sizes,
    } as ProductItem;
  }, [id, adminItems]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {!product ? (
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
          <p className="text-gray-600 mb-8">Vérifiez l&#39;identifiant transmis dans l&#39;URL.</p>
          <a href="/products" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors">Retour aux produits</a>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              {product.brand && (
                <div className="text-gray-600 mb-3">Marque: <span className="font-medium text-gray-900">{product.brand}</span></div>
              )}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} F CFA</span>
              </div>
              {product.description && (
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              )}
              <ProductDetailClient product={product} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


