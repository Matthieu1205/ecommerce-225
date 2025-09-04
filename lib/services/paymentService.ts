import {
  OrangeMoneyPaymentResponse,
  PaymentRequest,
  PaymentResult,
  WavePaymentResponse,
} from "../types/payment";

// Configuration des APIs de paiement
const PAYMENT_CONFIG = {
  wave: {
    apiUrl: process.env.NEXT_PUBLIC_WAVE_API_URL || "https://api.wave.com/v1",
    publicKey: process.env.NEXT_PUBLIC_WAVE_PUBLIC_KEY || "",
    secretKey: process.env.WAVE_SECRET_KEY || "",
  },
  orangeMoney: {
    apiUrl:
      process.env.NEXT_PUBLIC_ORANGE_MONEY_API_URL ||
      "https://api.orange.com/orange-money-webpay",
    clientId: process.env.NEXT_PUBLIC_ORANGE_MONEY_CLIENT_ID || "",
    clientSecret: process.env.ORANGE_MONEY_CLIENT_SECRET || "",
  },
};

export class PaymentService {
  // Méthode pour initier un paiement Wave
  static async initiateWavePayment(
    paymentRequest: PaymentRequest
  ): Promise<WavePaymentResponse> {
    try {
      const response = await fetch("/api/payment/wave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement Wave:", error);
      return {
        success: false,
        error: "Erreur de connexion au service Wave",
      };
    }
  }

  // Méthode pour initier un paiement Orange Money
  static async initiateOrangeMoneyPayment(
    paymentRequest: PaymentRequest
  ): Promise<OrangeMoneyPaymentResponse> {
    try {
      const response = await fetch("/api/payment/orange-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Erreur lors de l'initiation du paiement Orange Money:",
        error
      );
      return {
        success: false,
        error: "Erreur de connexion au service Orange Money",
      };
    }
  }

  // Méthode pour vérifier le statut d'une transaction
  static async checkPaymentStatus(
    transactionId: string,
    paymentMethod: "wave" | "orange_money"
  ): Promise<PaymentResult> {
    try {
      const response = await fetch(
        `/api/payment/status/${paymentMethod}/${transactionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la vérification du statut:", error);
      return {
        success: false,
        paymentMethod,
        amount: 0,
        status: "failed",
        error: "Erreur de vérification du statut",
      };
    }
  }

  // Méthode pour formater le montant selon la devise
  static formatAmount(amount: number, currency: string = "XOF"): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  // Méthode pour générer un ID de commande unique
  static generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `ORDER_${timestamp}_${random}`.toUpperCase();
  }
}

