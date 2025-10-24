"use client";

import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function VipPage() {
  const perks = [
    {
      icon: "ri-vip-crown-line",
      title: "Accès prioritaire",
      desc: "Soyez le premier à profiter des nouveaux produits et éditions limitées.",
    },
    {
      icon: "ri-discount-percent-line",
      title: "Réductions exclusives",
      desc: "Jusqu'à 20% de remise sur une sélection d'articles toute l'année.",
    },
    {
      icon: "ri-truck-line",
      title: "Livraison express",
      desc: "Livraison prioritaire et retours offerts pour les membres VIP.",
    },
    {
      icon: "ri-customer-service-2-line",
      title: "Conciergerie dédiée",
      desc: "Un assistant personnel pour vos achats et demandes spéciales.",
    },
  ];

  const tiers = [
    {
      name: "Silver",
      price: 4990,
      period: "/mois",
      features: [
        "5% de remise permanente",
        "Accès anticipé aux promos",
        "Support prioritaire",
      ],
      cta: "Rejoindre Silver",
      highlight: false,
    },
    {
      name: "Gold",
      price: 9990,
      period: "/mois",
      features: [
        "10% de remise permanente",
        "Livraison express offerte",
        "Conciergerie dédiée",
      ],
      cta: "Rejoindre Gold",
      highlight: true,
    },
    {
      name: "Platinum",
      price: 19990,
      period: "/mois",
      features: [
        "20% de remise permanente",
        "Accès évènements privés",
        "Éditions limitées garanties",
      ],
      cta: "Rejoindre Platinum",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-200 mb-5">
              <i className="ri-vip-crown-line mr-2"></i> Programme VIP
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              L'expérience d'achat la plus exclusive
            </h1>
            <p className="text-lg text-gray-600">
              Devenez membre VIP et bénéficiez d'avantages uniques, d'offres
              privées et d'un service haut de gamme.
            </p>
            <div className="w-36 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4">
                  <i className={`${perk.icon} text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {perk.title}
                </h3>
                <p className="text-sm text-gray-600">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border ${
                  tier.highlight
                    ? "border-green-500 shadow-2xl"
                    : "border-gray-200 shadow-lg"
                } bg-white p-6 flex flex-col`}
              >
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    {tier.name}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    {tier.price.toLocaleString()} F CFA
                    <span className="text-base font-medium text-gray-500 ml-1">
                      {tier.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 text-gray-700">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto w-full py-3 rounded-xl font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Annulation possible à tout moment. Tarifs TTC.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Prêt à rejoindre le club ?
            </h2>
            <p className="text-gray-700 mb-6">
              Inscrivez-vous et profitez immédiatement des avantages VIP.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Créer un compte
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Découvrir les produits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Questions fréquentes
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "Comment fonctionne l'abonnement ?",
                a: "Vous êtes facturé mensuellement. Vous pouvez annuler à tout moment depuis votre espace profil.",
              },
              {
                q: "Les remises s'appliquent-elles sur tous les produits ?",
                a: "La remise permanente s'applique sur la majorité du catalogue, hors exclusions exceptionnelles.",
              },
              {
                q: "Puis-je changer de formule ?",
                a: "Oui, vous pouvez upgrader ou downgrader votre formule VIP à tout moment.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="border border-gray-200 rounded-xl p-4 bg-white"
              >
                <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




