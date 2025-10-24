export default function AdminDashboard() {
  const cards = [
    { title: "Produits", value: "12", href: "/admin/produits" },
    { title: "Commandes", value: "5", href: "/admin/commandes" },
    { title: "Clients", value: "2", href: "/admin/clients" },
    { title: "Paiements", value: "Wave", href: "/admin/paiements" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <a key={c.title} href={c.href} className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow">
            <div className="text-gray-500 text-sm">{c.title}</div>
            <div className="text-2xl font-bold">{c.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}


