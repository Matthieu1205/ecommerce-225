"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { useCartStore } from "../../../lib/cartStore";
import { PaymentService } from "../../../lib/services/paymentService";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    transactionId?: string;
    amount?: number;
    message?: string;
  }>({ success: false });

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    const paymentMethod = searchParams.get("payment_method") as
      | "wave"
      | "orange_money";
    const status = searchParams.get("status");

    if (transactionId && paymentMethod) {
      // Vérifier le statut du paiement
      PaymentService.checkPaymentStatus(transactionId, paymentMethod)
        .then((result) => {
          setPaymentStatus({
            success: result.success,
            transactionId: result.transactionId,
            amount: result.amount,
            message: result.message,
          });

          if (result.success && result.status === "completed") {
            // Vider le panier après un paiement réussi
            clearCart();
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification du paiement:", error);
          setPaymentStatus({
            success: false,
            message: "Erreur lors de la vérification du paiement",
          });
        });
    } else {
      // Si pas de paramètres, rediriger vers la page d'accueil
      router.push("/");
    }
  }, [searchParams, clearCart, router]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          {paymentStatus.success ? (
            <>
              {/* Icône de succès */}
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-green-100 rounded-full">
                <i className="ri-check-line text-4xl text-green-600"></i>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Paiement réussi !
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Votre commande a été traitée avec succès
              </p>

              {paymentStatus.transactionId && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Détails de la transaction
                  </h2>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID de transaction:</span>
                      <span className="font-mono text-sm">
                        {paymentStatus.transactionId}
                      </span>
                    </div>
                    {paymentStatus.amount && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montant:</span>
                        <span className="font-semibold">
                          {PaymentService.formatAmount(paymentStatus.amount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      <span className="text-green-600 font-semibold">Payé</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-gray-600">
                  Vous recevrez un email de confirmation avec les détails de
                  votre commande.
                </p>
                <p className="text-gray-600">
                  Notre équipe vous contactera pour organiser la livraison.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/"
                  className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  Retour à l'accueil
                </Link>
                <Link
                  href="/products"
                  className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Continuer mes achats
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Icône d'erreur */}
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-red-100 rounded-full">
                <i className="ri-close-line text-4xl text-red-600"></i>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Paiement échoué
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                {paymentStatus.message ||
                  "Une erreur est survenue lors du traitement de votre paiement"}
              </p>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Veuillez réessayer ou choisir une autre méthode de paiement.
                </p>
                <p className="text-gray-600">
                  Si le problème persiste, contactez notre service client.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/payment"
                  className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  Réessayer le paiement
                </Link>
                <Link
                  href="/cart"
                  className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Retour au panier
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
