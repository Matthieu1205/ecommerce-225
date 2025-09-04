"use client";

import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../lib/cartStore";

export default function Cart() {
  const { items: cartItems, updateQuantity, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = cartItems.length > 0 ? 1990 : 0; // 1 990 F CFA
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Votre Panier</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-gray-100 rounded-full">
              <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">
                        {Number(item.price).toLocaleString()} F CFA
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                        title="Diminuer la quantité"
                      >
                        <i className="ri-subtract-line text-gray-600"></i>
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                        title="Augmenter la quantité"
                      >
                        <i className="ri-add-line text-gray-600"></i>
                      </button>
                    </div>

                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                      title="Supprimer l'article"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Récapitulatif
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">
                      {Number(subtotal).toLocaleString()} F CFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {Number(shipping).toLocaleString()} F CFA
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>{Number(total).toLocaleString()} F CFA</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/payment"
                  className="block w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap font-semibold mb-4 text-center"
                >
                  Procéder au Paiement
                </Link>

                <Link
                  href="/products"
                  className="block text-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Continuer vos achats
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Paiement sécurisé avec :
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <i className="ri-bank-card-line text-gray-700"></i>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <i className="ri-paypal-line text-gray-700"></i>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <i className="ri-secure-payment-line text-gray-700"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
