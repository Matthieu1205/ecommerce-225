"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "../lib/cartStore";
import { useAuthStore } from "../lib/stores/authStore";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // Avoid hydration mismatches for client-only UI (e.g., cart count)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fermer les menus quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as Element;
        if (!target.closest(".user-menu-container")) {
          setShowUserMenu(false);
        }
      }
      if (showSearch) {
        const target = event.target as Element;
        if (!target.closest(".search-inline-container")) {
          setShowSearch(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, showSearch]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query.length === 0) return;
    if (pathname !== "/products") {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.replace(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const query = value.trim();
    if (query.length === 0) {
      if (pathname === "/products") router.replace(`/products`);
      return;
    }
    if (pathname !== "/products") {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.replace(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <h1 className="text-3xl font-['Pacifico'] bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-500 transition-all duration-300">
              Mani.Shop-ci
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
            {/* Recherche inline */}
            <div className="flex items-center space-x-2 search-inline-container">
              <button
                title="Rechercher"
                onClick={() => {
                  setShowSearch((v) => !v);
                  setTimeout(() => searchInputRef.current?.focus(), 0);
                }}
                className="group p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer relative"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-search-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
                </div>
              </button>
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className={`transition-all duration-300 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 ${
                    showSearch
                      ? "w-64 opacity-100"
                      : "w-0 opacity-0 px-0 py-0 border-transparent"
                  }`}
                  style={{ marginLeft: showSearch ? undefined : 0 }}
                />
              </form>
            </div>
            {/* Menu utilisateur */}
            <div className="relative user-menu-container">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="group p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer relative flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm">
                      {user?.name}
                    </span>
                    <i className="ri-arrow-down-s-line text-sm"></i>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-user-line mr-2"></i>
                        Mon profil
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-shopping-bag-line mr-2"></i>
                        Mes commandes
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <i className="ri-logout-box-line mr-2"></i>
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="group p-3 text-white hover:text-green-400 transition-colors duration-300 cursor-pointer relative"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-user-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-login-box-line mr-2"></i>
                        Se connecter
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-user-add-line mr-2"></i>
                        S'inscrire
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
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
              {hasMounted && totalItems > 0 && (
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
