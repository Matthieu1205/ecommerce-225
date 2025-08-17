"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../lib/cartStore";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <h1 className="text-3xl font-['Pacifico'] bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-500 transition-all duration-300">
              logo
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/"
              className="relative text-white hover:text-green-400 transition-colors duration-300 whitespace-nowrap group text-lg"
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/products"
              className="relative text-white hover:text-green-400 transition-colors duration-300 whitespace-nowrap group text-lg"
            >
              Produits
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/categories"
              className="relative text-white hover:text-green-400 transition-colors duration-300 whitespace-nowrap group text-lg"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/vip"
              className="relative text-white hover:text-green-400 transition-colors duration-300 whitespace-nowrap group text-lg"
            >
              VIP
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button className="group p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer relative">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-search-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
            </button>
            <button className="group p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer relative">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-user-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
            </button>
            <Link
              href="/cart"
              className="group relative p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer"
            >
              <div
                className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                  isAnimating ? "animate-bounce" : ""
                }`}
              >
                <i
                  className={`ri-shopping-cart-line text-xl group-hover:scale-110 transition-transform duration-300 ${
                    isAnimating ? "text-green-400" : ""
                  }`}
                ></i>
              </div>
              {totalItems > 0 && (
                <span
                  className={`absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                    isAnimating ? "animate-pulse scale-125" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
