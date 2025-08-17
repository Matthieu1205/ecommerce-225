
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '../../lib/cartStore';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('Popularité');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const addItem = useCartStore(state => state.addItem);

  const categories = ['Tous', 'Mode', 'Technologie', 'Maison', 'Sport'];
  const sortOptions = ['Popularité', 'Prix croissant', 'Prix décroissant', 'Nouveautés'];

  const products = [
    {
      id: 1,
      name: "Montre Élégante Premium",
      price: 299.99,
      originalPrice: 399.99,
      category: "Mode",
      image: "https://readdy.ai/api/search-image?query=luxury%20elegant%20watch%20with%20leather%20strap%20on%20pure%20white%20background%2C%20premium%20timepiece%20with%20sophisticated%20details%2C%20professional%20product%20photography%2C%20minimalist%20aesthetic%20with%20soft%20lighting&width=400&height=400&seq=watch2&orientation=squarish",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Sac à Main Cuir Premium",
      price: 199.99,
      originalPrice: 249.99,
      category: "Mode",
      image: "https://readdy.ai/api/search-image?query=premium%20leather%20handbag%20on%20clean%20white%20background%2C%20luxury%20fashion%20accessory%20with%20golden%20hardware%2C%20elegant%20design%2C%20professional%20product%20photography%20style&width=400&height=400&seq=bag2&orientation=squarish",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Baskets Sport Innovation",
      price: 149.99,
      originalPrice: 199.99,
      category: "Sport",
      image: "https://readdy.ai/api/search-image?query=modern%20athletic%20sneakers%20on%20white%20background%2C%20innovative%20sporty%20design%20with%20premium%20materials%2C%20contemporary%20running%20shoes%2C%20clean%20product%20photography&width=400&height=400&seq=shoes2&orientation=squarish",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Casque Audio Wireless Pro",
      price: 249.99,
      originalPrice: 299.99,
      category: "Technologie",
      image: "https://readdy.ai/api/search-image?query=professional%20wireless%20headphones%20on%20white%20background%2C%20premium%20audio%20equipment%20with%20sleek%20black%20design%2C%20modern%20tech%20product%20photography%2C%20minimalist%20style&width=400&height=400&seq=headphones2&orientation=squarish",
      rating: 4.8,
      reviews: 203
    },
    {
      id: 5,
      name: "Smartphone Dernière Génération",
      price: 699.99,
      originalPrice: 799.99,
      category: "Technologie",
      image: "https://readdy.ai/api/search-image?query=latest%20generation%20smartphone%20on%20pure%20white%20background%2C%20sleek%20modern%20mobile%20device%2C%20premium%20technology%20product%2C%20professional%20clean%20photography%20style&width=400&height=400&seq=phone1&orientation=squarish",
      rating: 4.9,
      reviews: 312
    },
    {
      id: 6,
      name: "Veste Élégante Automne",
      price: 179.99,
      originalPrice: 229.99,
      category: "Mode",
      image: "https://readdy.ai/api/search-image?query=elegant%20autumn%20jacket%20on%20white%20background%2C%20stylish%20outerwear%20garment%2C%20premium%20fashion%20clothing%2C%20sophisticated%20design%20with%20clean%20product%20photography&width=400&height=400&seq=jacket1&orientation=squarish",
      rating: 4.6,
      reviews: 78
    },
    {
      id: 7,
      name: "Lampe Design Moderne",
      price: 89.99,
      originalPrice: 119.99,
      category: "Maison",
      image: "https://readdy.ai/api/search-image?query=modern%20design%20lamp%20on%20white%20background%2C%20contemporary%20home%20lighting%20fixture%2C%20minimalist%20interior%20decoration%2C%20elegant%20household%20accessory%20with%20clean%20aesthetics&width=400&height=400&seq=lamp1&orientation=squarish",
      rating: 4.5,
      reviews: 92
    },
    {
      id: 8,
      name: "Tapis de Yoga Premium",
      price: 59.99,
      originalPrice: 79.99,
      category: "Sport",
      image: "https://readdy.ai/api/search-image?query=premium%20yoga%20mat%20on%20white%20background%2C%20high%20quality%20exercise%20equipment%2C%20modern%20fitness%20accessory%2C%20clean%20sports%20product%20photography%20with%20minimalist%20style&width=400&height=400&seq=yoga1&orientation=squarish",
      rating: 4.7,
      reviews: 145
    }
  ];

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
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
            <span className="font-semibold">{addedProductName} ajouté au panier !</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nos Produits</h1>
          <p className="text-xl text-gray-600">Découvrez notre collection complète de produits premium</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-gray-200">
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
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Trier par:</span>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                  {sortBy}
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 flex items-center justify-center">
                        <i className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice}€</span>
                  )}
                </div>
                
                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Ajouter au Panier
                </button>
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
