"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products as dataProducts, ProductItem } from "../../lib/data/products";
import { useAdminProductsStore } from "../../lib/stores/adminProductsStore";
import { flushSync } from "react-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../lib/cartStore";
import { useWishlistStore } from "../../lib/stores/wishlistStore";

export default function Products() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("Popularité");
  const [showNotification, setShowNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const [likeBurstIds, setLikeBurstIds] = useState<number[]>([]);
  const [navigatingId, setNavigatingId] = useState<number | null>(null);
  // variant selections are managed on detail page; no local selection here
  const [productViews, setProductViews] = useState<Record<number, number>>({});
  const viewedIdsRef = useRef<Set<number>>(new Set());
  const addItem = useCartStore((state) => state.addItem);
  const { add: addWish, remove: removeWish, has: hasWish } = useWishlistStore();
  const searchParams = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const { items: adminItems } = useAdminProductsStore();
  const products: ProductItem[] = useMemo(() => {
    const adminAsProducts: ProductItem[] = adminItems.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category as any,
      image: p.image,
      rating: 5,
      reviews: 0,
      description: p.description,
      brand: p.brand,
      colors: p.colors,
      sizes: p.sizes,
    }));
    // Merge static products with admin-managed ones, preferring admin version on ID conflicts
    const byId = new Map<number, ProductItem>();
    dataProducts.forEach((p) => byId.set(p.id, p));
    adminAsProducts.forEach((p) => byId.set(p.id, p));
    return Array.from(byId.values());
  }, [adminItems]);
  const categories = ["Tous", "Mode", "Technologie", "Maison", "Sport"];
  const sortOptions = [
    "Popularité",
    "Prix croissant",
    "Prix décroissant",
    "Nouveautés",
  ];
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => { if (p.brand) set.add(p.brand); });
    return Array.from(set);
  }, [products]);
  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.colors || []).forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const [brandFilter, setBrandFilter] = useState<string>("Toutes");
  const [colorFilter, setColorFilter] = useState<string>("Toutes");
  const [sizeFilter, setSizeFilter] = useState<string>("Toutes");

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== "Tous") {
      list = list.filter((product) => product.category === selectedCategory);
    }
    if (searchQuery.length > 0) {
      list = list.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(searchQuery)
      );
    }
    if (brandFilter !== "Toutes") {
      list = list.filter((product) => product.brand === brandFilter);
    }
    if (colorFilter !== "Toutes") {
      list = list.filter((product) => (product.colors || []).includes(colorFilter));
    }
    if (sizeFilter !== "Toutes") {
      list = list.filter((product) => (product.sizes || []).includes(sizeFilter));
    }
    switch (sortBy) {
      case "Prix croissant":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "Prix décroissant":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "Nouveautés":
        list = [...list].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy, brandFilter, colorFilter, sizeFilter]);

  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem(product);
    setAddedProductName(product.name);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleLike = (product: { id: number; name: string; price: number; image: string; }) => {
    if (hasWish(product.id)) {
      removeWish(product.id);
    } else {
      addWish({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    // Trigger a short burst animation
    setLikeBurstIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setLikeBurstIds((prev) => prev.filter((id) => id !== product.id));
    }, 300);
  };

  const incrementViews = (productId: number) => {
    setProductViews((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Compter automatiquement une vue quand la carte est visible
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-product-card="true"]')
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idAttr = el.getAttribute("data-product-id");
            const productId = idAttr ? parseInt(idAttr, 10) : NaN;
            if (
              !Number.isNaN(productId) &&
              !viewedIdsRef.current.has(productId)
            ) {
              viewedIdsRef.current.add(productId);
              incrementViews(productId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [filteredProducts]);

  // Persisted state for views
  useEffect(() => {
    try {
      const rawViews = localStorage.getItem("productViews");
      if (rawViews) {
        const parsed = JSON.parse(rawViews);
        if (parsed && typeof parsed === "object")
          setProductViews(parsed as Record<number, number>);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("productViews", JSON.stringify(productViews));
    } catch {}
  }, [productViews]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-check-line text-xl font-bold"></i>
            </div>
            <span className="font-semibold">
              {addedProductName} ajouté au panier !
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Nos Produits
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mb-6"></div>
          <p className="text-xl text-gray-600">
            Découvrez notre collection complète de produits premium
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Additional Filters + Sort */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Marque:</span>
                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} aria-label="Filtrer par marque" className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  <option value="Toutes">Toutes</option>
                  {allBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Couleur:</span>
                <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} aria-label="Filtrer par couleur" className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  <option value="Toutes">Toutes</option>
                  {allColors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Taille:</span>
                <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)} aria-label="Filtrer par taille" className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  <option value="Toutes">Toutes</option>
                  {allSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-gray-600">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Trier par"
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/10 transition-shadow cursor-pointer group relative overflow-hidden"
                data-product-card="true"
                data-product-id={product.id}
                onClick={() => {
                  flushSync(() => setNavigatingId(product.id));
                  setTimeout(() => {
                    router.push(`/product?id=${product.id}`);
                  }, 300);
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                {/* Like button */}
                <button
                  type="button"
                  aria-label="Liker le produit"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product);
                  }}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow transition-transform z-10 ${
                    likeBurstIds.includes(product.id)
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  title="J'aime"
                >
                  <i
                    className={`ri-heart-${hasWish(product.id) ? "fill" : "line"} text-2xl ${hasWish(product.id) ? "text-green-500" : "text-gray-600 hover:text-green-500"}`}
                  ></i>
                  {likeBurstIds.includes(product.id) && (
                    <span className="pointer-events-none absolute inline-flex h-10 w-10 rounded-full bg-green-400/20 animate-ping"></span>
                  )}
                </button>
                {/* Views button */}
                <button
                  type="button"
                  aria-label="Nombre de vues"
                  className="absolute top-4 left-4 px-3 h-10 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm hover:shadow transition-all text-gray-700"
                  title="Vues du produit"
                >
                  <i className="ri-eye-line text-lg"></i>
                  <span className="text-sm font-medium">
                    {(productViews[product.id] || 0).toLocaleString()}
                  </span>
                </button>
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {navigatingId === product.id && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
                  </div>
                )}

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                {product.brand && (
                  <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
                )}

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 flex items-center justify-center"
                      >
                        <i
                          className={`ri-star-${
                            i < Math.floor(product.rating) ? "fill" : "line"
                          } text-green-400 text-sm`}
                        ></i>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toLocaleString()} F CFA
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {Number(product.originalPrice * 1000).toLocaleString()} F
                      CFA
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const colorNeeded = (product.colors && product.colors.length > 0);
                    const sizeNeeded = (product.sizes && product.sizes.length > 0);
                    if (colorNeeded || sizeNeeded) {
                      router.push(`/product?id=${product.id}`);
                      return;
                    }
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                  }}
                    className="w-full bg-white text-gray-900 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm sm:text-base px-3 truncate"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const colorNeeded = (product.colors && product.colors.length > 0);
                      const sizeNeeded = (product.sizes && product.sizes.length > 0);
                      if (colorNeeded || sizeNeeded) {
                        router.push(`/product?id=${product.id}`);
                        return;
                      }
                      try {
                        const payload = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                        };
                        sessionStorage.setItem(
                          "buy_now_item",
                          JSON.stringify(payload)
                        );
                      } catch {}
                      router.push("/payment?buynow=1");
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors cursor-pointer shadow-md text-sm sm:text-base px-3 truncate"
                  >
                    Acheter maintenant
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
