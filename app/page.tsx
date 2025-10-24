"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCartStore } from "../lib/cartStore";

export default function Home() {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const featuredProducts = [
    {
      id: 1,
      name: "Montre Élégante",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20watch%20on%20dark%20marble%20surface%20with%20dramatic%20lighting%2C%20sophisticated%20masculine%20aesthetic%2C%20premium%20gold%20and%20leather%20materials%2C%20cinematic%20product%20photography%20with%20deep%20shadows%20and%20warm%20highlights&width=400&height=400&seq=watch2&orientation=squarish",
    },
    {
      id: 2,
      name: "Sac à Main Premium",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://readdy.ai/api/search-image?query=premium%20leather%20mens%20briefcase%20on%20luxurious%20dark%20background%2C%20masculine%20elegant%20design%20with%20gold%20hardware%2C%20sophisticated%20business%20accessory%2C%20moody%20atmospheric%20lighting%20with%20rich%20textures&width=400&height=400&seq=bag2&orientation=squarish",
    },
    {
      id: 3,
      name: "Chaussures de Luxe",
      price: 349.99,
      originalPrice: 499.99,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20dress%20shoes%20on%20dark%20slate%20surface%2C%20premium%20leather%20oxford%20style%2C%20sophisticated%20masculine%20footwear%2C%20dramatic%20lighting%20with%20rich%20shadows%20and%20elegant%20presentation&width=400&height=400&seq=shoes2&orientation=squarish",
    },
    {
      id: 4,
      name: "Parfum Signature",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20cologne%20bottle%20on%20dark%20background%20with%20golden%20accents%2C%20sophisticated%20fragrance%20packaging%2C%20masculine%20elegant%20design%20with%20dramatic%20lighting%20and%20premium%20presentation&width=400&height=400&seq=perfume1&orientation=squarish",
    },
  ];

  const categories = [
    {
      name: "Mode Masculine",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20mens%20fashion%20collection%20with%20designer%20suits%20ties%20and%20accessories%2C%20sophisticated%20masculine%20wardrobe%20display%2C%20premium%20menswear%20arranged%20elegantly%20on%20dark%20wood%20surfaces%20with%20dramatic%20lighting&width=300&height=200&seq=fashion2&orientation=landscape",
      count: 125,
    },
    {
      name: "Montres & Bijoux",
      image:
        "https://readdy.ai/api/search-image?query=collection%20of%20luxury%20mens%20watches%20and%20jewelry%20on%20dark%20velvet%20surface%2C%20premium%20timepieces%20and%20masculine%20accessories%2C%20sophisticated%20presentation%20with%20golden%20lighting%20and%20rich%20textures&width=300&height=200&seq=watches1&orientation=landscape",
      count: 87,
    },
    {
      name: "Maroquinerie",
      image:
        "https://readdy.ai/api/search-image?query=premium%20mens%20leather%20goods%20collection%20including%20wallets%20briefcases%20and%20belts%2C%20luxury%20masculine%20accessories%20on%20dark%20marble%20surface%20with%20elegant%20presentation%20and%20warm%20atmospheric%20lighting&width=300&height=200&seq=leather1&orientation=landscape",
      count: 203,
    },
  ];

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
    <div className="min-h-screen bg-gray-900">
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

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%), url('https://readdy.ai/api/search-image?query=sophisticated%20luxury%20mens%20boutique%20interior%20with%20premium%20brand%20displays%20featuring%20Lacoste%20Hugo%20Boss%20Nike%20Louis%20Vuitton%20Dolce%20Gabbana%20products%2C%20elegant%20dark%20mahogany%20wood%20shelving%20and%20marble%20floors%2C%20dramatic%20cinematic%20lighting%20with%20golden%20accents%2C%20masculine%20shopping%20environment%20with%20rich%20textures%20and%20contemporary%20design%20elements&width=1920&height=1080&seq=hero_mens2&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-8">
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Luxe
                  </span>
                  <br />
                  <span className="text-white">& Élégance</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
              </div>
              <p className="text-2xl md:text-3xl text-white mb-12 opacity-90 font-light max-w-3xl mx-auto leading-relaxed">
                Collection exclusive de produits premium pour l homme moderne
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/products"
                  className="group relative inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden"
                >
                  <span className="relative z-10">Explorer la Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/vip"
                  className="inline-block border-2 border-white text-white px-12 py-5 text-xl font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Programme VIP
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 from-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 from-green-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 from-green-400 rounded-full animate-pulse delay-700"></div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Sélection
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                {" "}
                Premium
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300">
              Découvrez nos pièces d exception
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="aspect-square mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="font-bold text-xl text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-green-400">
                    {Number(product.price).toLocaleString()} F CFA
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {Number(product.originalPrice).toLocaleString()} F CFA
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer relative overflow-hidden group"
                >
                  <span className="relative z-10">Ajouter au Panier</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Nos
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                {" "}
                Collections
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300">
              Explorez l'univers du luxe masculin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-gray-700">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {category.count}
                    </div>
                  </div>
                  <div className="p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-gray-400 group-hover:text-green-300 transition-colors duration-300">
                      <span>Découvrir</span>
                      <div className="w-5 h-5 flex items-center justify-center ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                        <i className="ri-arrow-right-line text-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>

            <h2 className="text-5xl font-bold text-white mb-6">
              Rejoignez le
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                {" "}
                Club VIP
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"></div>
            <p className="text-2xl text-gray-300 mb-12 opacity-90 leading-relaxed">
              Accès exclusif aux nouveautés et offres privilégiées
            </p>

            <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-8 py-5 rounded-full text-white bg-gray-800/50 border border-gray-600 text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-full font-bold hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer text-lg">
                Rejoindre
              </button>
            </div>
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
      `}</style>
    </div>
  );
}
