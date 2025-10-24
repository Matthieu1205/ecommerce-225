"use client";

import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useWishlistStore } from "../../lib/stores/wishlistStore";
import { useCartStore } from "../../lib/cartStore";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mes favoris</h1>
            <p className="text-gray-600">Retrouvez ici vos produits enregistrés</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Vider la liste
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-gray-100 rounded-full">
              <i className="ri-heart-line text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-gray-600 mb-8">
              Parcourez nos produits et ajoutez vos préférés à votre liste
            </p>
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    Favori
                  </span>
                  <button
                    onClick={() => remove(product.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Retirer des favoris"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toLocaleString()} F CFA
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="w-full bg-white text-gray-900 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm sm:text-base px-3 truncate"
                  >
                    Ajouter au panier
                  </button>
                  <Link
                    href="/products"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors cursor-pointer shadow-md text-center text-sm sm:text-base px-3 truncate"
                  >
                    Voir similaires
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


