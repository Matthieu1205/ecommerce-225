"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../lib/cartStore";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    "Tous",
    "Mode Masculine",
    "Montres & Bijoux",
    "Maroquinerie",
    "Technologie",
    "Sport",
  ];

  const products = [
    {
      id: 1,
      name: "Montre Élégante Premium",
      price: 299.99,
      originalPrice: 399.99,
      category: "Montres & Bijoux",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20watch%20with%20gold%20bracelet%20on%20dark%20marble%20surface%2C%20sophisticated%20masculine%20timepiece%20with%20premium%20materials%2C%20elegant%20design%20with%20dramatic%20lighting%20and%20rich%20shadows%2C%20professional%20product%20photography&width=400&height=400&seq=watch_cat1&orientation=squarish",
      rating: 4.8,
      reviews: 124,
      brand: "Hugo Boss",
    },
    {
      id: 2,
      name: "Sac Business Cuir Premium",
      price: 449.99,
      originalPrice: 599.99,
      category: "Maroquinerie",
      image:
        "https://readdy.ai/api/search-image?query=premium%20mens%20leather%20briefcase%20on%20dark%20wooden%20surface%2C%20luxury%20business%20bag%20with%20golden%20hardware%2C%20sophisticated%20masculine%20design%2C%20elegant%20presentation%20with%20warm%20atmospheric%20lighting&width=400&height=400&seq=bag_cat1&orientation=squarish",
      rating: 4.9,
      reviews: 89,
      brand: "Louis Vuitton",
    },
    {
      id: 3,
      name: "Sneakers Limited Edition",
      price: 349.99,
      originalPrice: 499.99,
      category: "Mode Masculine",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20sneakers%20on%20dark%20background%2C%20premium%20athletic%20footwear%20with%20sophisticated%20design%2C%20masculine%20elegant%20shoes%20with%20dramatic%20lighting%20and%20modern%20presentation&width=400&height=400&seq=shoes_cat1&orientation=squarish",
      rating: 4.7,
      reviews: 156,
      brand: "Nike",
    },
    {
      id: 4,
      name: "Portefeuille Signature",
      price: 249.99,
      originalPrice: 329.99,
      category: "Maroquinerie",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20wallet%20on%20dark%20marble%20surface%2C%20premium%20leather%20goods%20with%20elegant%20design%2C%20sophisticated%20masculine%20accessory%20with%20golden%20accents%20and%20dramatic%20lighting&width=400&height=400&seq=wallet_cat1&orientation=squarish",
      rating: 4.8,
      reviews: 203,
      brand: "Dolce & Gabbana",
    },
    {
      id: 5,
      name: "Polo Élégant Premium",
      price: 149.99,
      originalPrice: 199.99,
      category: "Mode Masculine",
      image:
        "https://readdy.ai/api/search-image?query=premium%20mens%20polo%20shirt%20on%20dark%20background%2C%20luxury%20masculine%20fashion%20with%20sophisticated%20design%2C%20elegant%20clothing%20presentation%20with%20dramatic%20lighting%20and%20rich%20textures&width=400&height=400&seq=polo_cat1&orientation=squarish",
      rating: 4.6,
      reviews: 78,
      brand: "Lacoste",
    },
    {
      id: 6,
      name: "Montre Connectée Pro",
      price: 599.99,
      originalPrice: 799.99,
      category: "Technologie",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20smartwatch%20on%20dark%20surface%2C%20premium%20technology%20accessory%20with%20sophisticated%20design%2C%20modern%20masculine%20gadget%20with%20elegant%20presentation%20and%20atmospheric%20lighting&width=400&height=400&seq=smartwatch_cat1&orientation=squarish",
      rating: 4.9,
      reviews: 312,
      brand: "Apple",
    },
    {
      id: 7,
      name: "Ceinture Cuir Signature",
      price: 179.99,
      originalPrice: 229.99,
      category: "Maroquinerie",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20leather%20belt%20on%20dark%20wood%20surface%2C%20premium%20masculine%20accessory%20with%20golden%20buckle%2C%20sophisticated%20design%20with%20elegant%20presentation%20and%20warm%20lighting&width=400&height=400&seq=belt_cat1&orientation=squarish",
      rating: 4.5,
      reviews: 92,
      brand: "Hugo Boss",
    },
    {
      id: 8,
      name: "Baskets Running Elite",
      price: 199.99,
      originalPrice: 279.99,
      category: "Sport",
      image:
        "https://readdy.ai/api/search-image?query=premium%20mens%20running%20shoes%20on%20dark%20background%2C%20luxury%20athletic%20footwear%20with%20modern%20design%2C%20sophisticated%20sports%20equipment%20with%20dramatic%20lighting%20and%20elegant%20presentation&width=400&height=400&seq=running_cat1&orientation=squarish",
      rating: 4.7,
      reviews: 145,
      brand: "Nike",
    },
  ];

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);

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
            <span className="font-semibold">Produit ajouté au panier !</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Nos Collections
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Découvrez l'excellence dans chaque catégorie
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
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
                className="group relative bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                {/* Brand Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 backdrop-blur-sm">
                    {product.brand}
                  </span>
                </div>

                <div className="aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 flex items-center justify-center"
                      >
                        <i
                          className={`ri-star-${
                            i < Math.floor(product.rating) ? "fill" : "line"
                          } text-amber-400 text-sm`}
                        ></i>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {(product.price * 1000).toLocaleString()} F CFA
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {(product.originalPrice * 1000).toLocaleString()} F CFA
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer relative overflow-hidden group border border-gray-200 hover:border-green-500"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-shopping-cart-line"></i>
                    </div>
                    <span>Ajouter au Panier</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Marques
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                {" "}
                Partenaires
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              Les plus grandes marques de luxe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              "Lacoste",
              "Hugo Boss",
              "Nike",
              "Louis Vuitton",
              "Dolce & Gabbana",
            ].map((brand, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                    <i className="ri-vip-crown-line text-3xl text-green-500 group-hover:scale-110 transition-transform duration-300"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {brand}
                  </h3>
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
