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

    // Configuration Orange Money (à remplacer par vos vraies clés)
    const orangeMoneyConfig = {
      apiUrl:
        process.env.ORANGE_MONEY_API_URL ||
        "https://api.orange.com/orange-money-webpay",
      clientId: process.env.ORANGE_MONEY_CLIENT_ID || "",
      clientSecret: process.env.ORANGE_MONEY_CLIENT_SECRET || "",
    };

    // Simulation de l'appel à l'API Orange Money
    // En production, remplacez ceci par l'appel réel à l'API Orange Money
    const orangeMoneyPaymentData = {
      amount: paymentRequest.amount,
      currency: paymentRequest.currency || "XOF",
      description: paymentRequest.description,
      order_id: paymentRequest.orderId,
      customer: {
        phone: paymentRequest.customerInfo.phone,
        name: paymentRequest.customerInfo.name,
        email: paymentRequest.customerInfo.email,
      },
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback/orange-money`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    };

    // Simulation de la réponse Orange Money
    // En production, faites l'appel réel à l'API Orange Money
    const mockOrangeMoneyResponse = {
      success: true,
      transactionId: `OM_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      paymentUrl: `https://webpayment.orange.ci/payment/${paymentRequest.orderId}`,
      message: "Paiement Orange Money initié avec succès",
    };

    // En production, remplacez par:
    /*
    // 1. Obtenir le token d'accès
    const tokenResponse = await fetch(`${orangeMoneyConfig.apiUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: orangeMoneyConfig.clientId,
        client_secret: orangeMoneyConfig.clientSecret,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Initier le paiement
    const paymentResponse = await fetch(`${orangeMoneyConfig.apiUrl}/webpay/v1/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orangeMoneyPaymentData),
    });

    const paymentData = await paymentResponse.json();
    */

    return NextResponse.json(mockOrangeMoneyResponse);
  } catch (error) {
    console.error("Erreur Orange Money API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}

