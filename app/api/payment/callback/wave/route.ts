import { NextRequest, NextResponse } from "next/server";

// Endpoint pour recevoir les callbacks de Wave
export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json();

    console.log("Callback Wave reçu:", callbackData);

    // Vérifier la signature du callback si nécessaire
    // (Wave peut envoyer une signature pour vérifier l'authenticité)

    // Traiter les données du callback
    const { transaction_id, status, amount, currency } = callbackData;

    // Ici, vous pouvez :
    // 1. Mettre à jour le statut de la commande dans votre base de données
    // 2. Envoyer un email de confirmation
    // 3. Déclencher d'autres actions métier

    // Pour l'instant, on log simplement
    if (status === "completed" || status === "success") {
      console.log(
        `Paiement Wave réussi - Transaction: ${transaction_id}, Montant: ${amount} ${currency}`
      );
    } else if (status === "failed" || status === "cancelled") {
      console.log(`Paiement Wave échoué - Transaction: ${transaction_id}`);
    }

    // Répondre à Wave pour confirmer la réception
    return NextResponse.json({
      success: true,
      message: "Callback traité avec succès",
    });
  } catch (error) {
    console.error("Erreur lors du traitement du callback Wave:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}

// Endpoint GET pour les redirections après paiement (optionnel)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get("transaction_id");
  const status = searchParams.get("status");

  // Rediriger vers la page de succès avec les paramètres
  const redirectUrl = new URL("/payment/success", request.url);
  if (transactionId)
    redirectUrl.searchParams.set("transaction_id", transactionId);
  if (status) redirectUrl.searchParams.set("status", status);
  redirectUrl.searchParams.set("payment_method", "wave");

  return NextResponse.redirect(redirectUrl);
}
