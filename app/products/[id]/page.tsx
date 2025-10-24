import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Link from "next/link";
import { products, getProductById, getRelatedProducts } from "../../../lib/data/products";
import ProductDetailClient from "../../../components/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const product = getProductById(productId);

  if (!product || Number.isNaN(productId)) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
          <p className="text-gray-600 mb-8">Le produit que vous recherchez n&#39;existe pas.</p>
          <Link href="/products" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">Retour aux produits</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product.category, product.id, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gray-900">Produits</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories`} className="hover:text-gray-900">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            {product.brand && (
              <div className="text-gray-600 mb-3">Marque: <span className="font-medium text-gray-900">{product.brand}</span></div>
            )}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 flex items-center justify-center">
                    <i className={`ri-star-${i < Math.floor(product.rating) ? "fill" : "line"} text-amber-400 text-sm`}></i>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviews} avis)</span>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} F CFA</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{Number(product.originalPrice * 1000).toLocaleString()} F CFA</span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Catégorie</h2>
              <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700">{product.category}</span>
            </div>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.specs && product.specs.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Caractéristiques</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="text-gray-900 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ProductDetailClient product={product} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/product?id=${p.id}`} className="block bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{p.name}</h3>
                  <div className="text-gray-900 font-bold">{p.price.toLocaleString()} F CFA</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}


