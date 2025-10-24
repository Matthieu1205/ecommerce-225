import { NextRequest, NextResponse } from "next/server";

export async function generateStaticParams() {
  return [];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { method: string; transactionId: string } }
) {
  try {
    const { method, transactionId } = params;

    if (!method || !transactionId) {
      return NextResponse.json(
        {
          success: false,
          error: "Paramètres manquants",
        },
        { status: 400 }
      );
    }

    // Simulation de la vérification du statut
    // En production, faites l'appel réel à l'API correspondante
    const mockStatusResponse = {
      success: true,
      transactionId,
      paymentMethod: method,
      amount: 1000, // Montant simulé
      status: "completed",
      message: "Paiement confirmé",
    };

    // En production, remplacez par:
    /*
    if (method === 'wave') {
      const waveResponse = await fetch(`${process.env.WAVE_API_URL}/payments/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.WAVE_SECRET_KEY}`,
        },
      });
      const waveData = await waveResponse.json();
      return NextResponse.json(waveData);
    } else if (method === 'orange-money') {
      const omResponse = await fetch(`${process.env.ORANGE_MONEY_API_URL}/payments/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.ORANGE_MONEY_ACCESS_TOKEN}`,
        },
      });
      const omData = await omResponse.json();
      return NextResponse.json(omData);
    }
    */

    return NextResponse.json(mockStatusResponse);
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}
