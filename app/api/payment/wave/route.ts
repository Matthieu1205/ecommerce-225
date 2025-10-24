import { NextRequest, NextResponse } from "next/server";
import { PaymentRequest } from "../../../../lib/types/payment";

export async function POST(request: NextRequest) {
  try {
    const paymentRequest: PaymentRequest = await request.json();

    // Validation des données
    if (!paymentRequest.amount || paymentRequest.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Montant invalide",
        },
        { status: 400 }
      );
    }

    if (!paymentRequest.customerInfo.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Numéro de téléphone requis",
        },
        { status: 400 }
      );
    }

    // Configuration Wave
    const waveConfig = {
      apiUrl: process.env.WAVE_API_URL || "https://api.wave.com/v1",
      publicKey: process.env.WAVE_PUBLIC_KEY || "",
      secretKey: process.env.WAVE_SECRET_KEY || "",
    };

    // Déterminer l'URL de base dynamiquement
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // Préparer les données pour l'API Wave
    const wavePaymentData = {
      amount: paymentRequest.amount,
      currency: paymentRequest.currency || "XOF",
      description: paymentRequest.description,
      order_id: paymentRequest.orderId,
      customer: {
        phone: paymentRequest.customerInfo.phone,
        name: paymentRequest.customerInfo.name,
        email: paymentRequest.customerInfo.email,
      },
      callback_url: `${baseUrl}/api/payment/callback/wave`,
      return_url: `${baseUrl}/payment/success?payment_method=wave`,
      // Ajouter d'autres paramètres selon la documentation Wave
      metadata: {
        items: paymentRequest.items,
      },
    };

    // Simulation en mode développement ou si les clés API ne sont pas configurées
    if (process.env.NODE_ENV === "development" || !waveConfig.secretKey) {
      console.log(
        "Mode développement ou clés manquantes: Simulation du paiement Wave"
      );
      console.log("Données de paiement:", wavePaymentData);

      // Simuler un délai
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Réponse simulée
      const mockResponse = {
        success: true,
        transactionId: `wave_txn_${Date.now()}`,
        paymentUrl: `${baseUrl}/payment/success?transaction_id=wave_txn_${Date.now()}&status=completed&payment_method=wave`,
        message: "Paiement Wave simulé avec succès (mode développement)",
      };

      return NextResponse.json(mockResponse);
    }

    try {
      // Appel réel à l'API Wave
      const waveResponse = await fetch(`${waveConfig.apiUrl}/payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${waveConfig.secretKey}`,
          "Content-Type": "application/json",
          "X-API-Key": waveConfig.publicKey, // Si nécessaire
        },
        body: JSON.stringify(wavePaymentData),
      });

      if (!waveResponse.ok) {
        const errorData = await waveResponse.text();
        console.error("Erreur API Wave:", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Erreur lors de l'initiation du paiement Wave",
          },
          { status: waveResponse.status }
        );
      }

      const waveData = await waveResponse.json();

      // Adapter la réponse selon le format réel de Wave
      const response = {
        success: true,
        transactionId: waveData.transaction_id || waveData.id,
        paymentUrl: waveData.payment_url || waveData.checkout_url,
        message: "Paiement Wave initié avec succès",
      };

      return NextResponse.json(response);
    } catch (fetchError) {
      console.error("Erreur de connexion à Wave:", fetchError);
      return NextResponse.json(
        {
          success: false,
          error: "Erreur de connexion au service Wave",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur Wave API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}
