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

    // Configuration Wave (à remplacer par vos vraies clés)
    const waveConfig = {
      apiUrl: process.env.WAVE_API_URL || "https://api.wave.com/v1",
      publicKey: process.env.WAVE_PUBLIC_KEY || "",
      secretKey: process.env.WAVE_SECRET_KEY || "",
    };

    // Simulation de l'appel à l'API Wave
    // En production, remplacez ceci par l'appel réel à l'API Wave
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
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback/wave`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    };

    // Simulation de la réponse Wave
    // En production, faites l'appel réel à l'API Wave
    const mockWaveResponse = {
      success: true,
      transactionId: `WAVE_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      paymentUrl: `https://pay.wave.com/payment/${paymentRequest.orderId}`,
      message: "Paiement Wave initié avec succès",
    };

    // En production, remplacez par:
    /*
    const waveResponse = await fetch(`${waveConfig.apiUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${waveConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wavePaymentData),
    });

    const waveData = await waveResponse.json();
    */

    return NextResponse.json(mockWaveResponse);
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

