"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useAuthStore } from "../../lib/stores/authStore";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Simulation de commandes
  useEffect(() => {
    if (isAuthenticated) {
      // En production, récupérez les vraies commandes depuis l'API
      const mockOrders: Order[] = [
        {
          id: "ORDER_001",
          date: "2024-01-15",
          status: "delivered",
          total: 299.99,
          items: [
            {
              id: 1,
              name: "Montre Élégante Premium",
              price: 299.99,
              quantity: 1,
              image: "https://readdy.ai/api/search-image?query=luxury%20elegant%20watch%20with%20leather%20strap%20on%20pure%20white%20background%2C%20premium%20timepiece%20with%20sophisticated%20details%2C%20professional%20product%20photography%2C%20minimalist%20aesthetic%20with%20soft%20lighting&width=400&height=400&seq=watch2&orientation=squarish",
            },
          ],
        },
        {
          id: "ORDER_002",
          date: "2024-01-10",
          status: "shipped",
          total: 449.98,
          items: [
            {
              id: 2,
              name: "Sac à Main Cuir Premium",
              price: 199.99,
              quantity: 1,
              image: "https://readdy.ai/api/search-image?query=premium%20leather%20handbag%20on%20clean%20white%20background%2C%20luxury%20fashion%20accessory%20with%20golden%20hardware%2C%20elegant%20design%2C%20professional%20product%20photography%20style&width=400&height=400&seq=bag2&orientation=squarish",
            },
            {
              id: 3,
              name: "Baskets Sport Innovation",
              price: 149.99,
              quantity: 1,
              image: "https://readdy.ai/api/search-image?query=modern%20athletic%20sneakers%20on%20white%20background%2C%20innovative%20sporty%20design%20with%20premium%20materials%2C%20contemporary%20running%20shoes%2C%20clean%20product%20photography&width=400&height=400&seq=shoes2&orientation=squarish",
            },
          ],
        },
      ];
      setOrders(mockOrders);
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours";
      case "shipped":
        return "Expédiée";
      case "delivered":
        return "Livrée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mes Commandes</h1>
          <p className="text-gray-600">Suivez l'état de vos commandes</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-gray-100 rounded-full">
              <i className="ri-shopping-bag-line text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Aucune commande
            </h2>
            <p className="text-gray-600 mb-8">
              Vous n'avez pas encore passé de commande
            </p>
            <a
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Découvrir nos produits
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Commande #{order.id}
                    </h3>
                    <p className="text-gray-600">
                      Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {order.total.toFixed(2)}€
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Voir les détails
                  </button>
                  {order.status === "delivered" && (
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      Commander à nouveau
                    </button>
                  )}
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
