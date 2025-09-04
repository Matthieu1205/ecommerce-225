"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PaymentMethodCard from "../../components/PaymentMethodCard";
import PhoneConfirmation from "../../components/PhoneConfirmation";
import { useCartStore } from "../../lib/cartStore";
import { useAuthStore } from "../../lib/stores/authStore";
import { PaymentService } from "../../lib/services/paymentService";
import { PaymentMethod, PaymentRequest } from "../../lib/types/payment";

export default function PaymentPage() {
  const router = useRouter();
  const { items: cartItems, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentPhone, setPaymentPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showPhoneConfirmation, setShowPhoneConfirmation] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const paymentMethods: PaymentMethod[] = [
    {
      id: "wave",
      name: "Wave",
      icon: "/logos/wave-logo.svg",
      description: "Paiement sécurisé via Wave Mobile Money",
      enabled: true,
    },
    {
      id: "orange_money",
      name: "Orange Money",
      icon: "/logos/orange-money-logo.svg",
      description: "Paiement sécurisé via Orange Money",
      enabled: true,
    },
  ];

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  // Pré-remplir les informations si l'utilisateur est connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      setCustomerInfo({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
      if (user.phone) {
        setPaymentPhone(user.phone);
      }
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!selectedMethod) {
      setError("Veuillez sélectionner une méthode de paiement");
      return false;
    }
    if (!customerInfo.name.trim()) {
      setError("Veuillez saisir votre nom");
      return false;
    }
    if (!customerInfo.email.trim()) {
      setError("Veuillez saisir votre email");
      return false;
    }
    if (!customerInfo.phone.trim()) {
      setError("Veuillez saisir votre numéro de téléphone");
      return false;
    }
    if (!paymentPhone.trim()) {
      setError("Veuillez saisir votre numéro de téléphone pour le paiement");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setError("");

    try {
      const orderId = PaymentService.generateOrderId();
      const paymentRequest: PaymentRequest = {
        amount: total,
        currency: "XOF",
        description: `Commande ${orderId}`,
        orderId,
        customerInfo: {
          ...customerInfo,
          phone: paymentPhone, // Utiliser le numéro de paiement
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      let response;
      if (selectedMethod === "wave") {
        response = await PaymentService.initiateWavePayment(paymentRequest);
      } else if (selectedMethod === "orange_money") {
        response = await PaymentService.initiateOrangeMoneyPayment(
          paymentRequest
        );
      }

      if (response?.success && response.paymentUrl) {
        // Rediriger vers la page de paiement externe
        window.location.href = response.paymentUrl;
      } else {
        setError(response?.error || "Erreur lors de l'initiation du paiement");
      }
    } catch (error) {
      console.error("Erreur de paiement:", error);
      setError("Une erreur est survenue lors du traitement du paiement");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Paiement</h1>
          <p className="text-gray-600">
            Finalisez votre commande en toute sécurité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de commande */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
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

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-semibold">{shipping.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Informations client */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de livraison
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="+225 XX XX XX XX"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Méthodes de paiement */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Méthode de paiement
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    isSelected={selectedMethod === method.id}
                    onSelect={() => setSelectedMethod(method.id)}
                  />
                ))}
              </div>

              {/* Section de confirmation par numéro de téléphone */}
              {selectedMethod && (
                <PhoneConfirmation
                  selectedMethod={selectedMethod}
                  paymentPhone={paymentPhone}
                  onPhoneChange={setPaymentPhone}
                />
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing
                  ? "Traitement en cours..."
                  : `Payer ${total.toFixed(2)}€`}
              </button>

              <Link
                href="/cart"
                className="block text-center text-gray-600 hover:text-gray-900 transition-colors mt-4"
              >
                ← Retour au panier
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
