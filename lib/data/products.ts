export interface ProductItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Mode" | "Technologie" | "Maison" | "Sport";
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  specs?: Array<{ label: string; value: string }>;
  brand?: string;
  colors?: string[];
  sizes?: string[];
}

export const products: ProductItem[] = [
  {
    id: 1,
    name: "Montre Élégante Premium",
    price: 299.99,
    originalPrice: 399.99,
    category: "Mode",
    image:
      "https://readdy.ai/api/search-image?query=luxury%20elegant%20watch%20with%20leather%20strap%20on%20pure%20white%20background%2C%20premium%20timepiece%20with%20sophisticated%20details%2C%20professional%20product%20photography%2C%20minimalist%20aesthetic%20with%20soft%20lighting&width=400&height=400&seq=watch2&orientation=squarish",
    rating: 4.8,
    reviews: 124,
    description:
      "Montre haut de gamme au design élégant, matériaux premium et précision exceptionnelle.",
    specs: [
      { label: "Matière", value: "Acier inoxydable et cuir" },
      { label: "Étanchéité", value: "50 m" },
    ],
    brand: "Hugo Boss",
    colors: ["noir", "marron"],
    sizes: [],
  },
  {
    id: 2,
    name: "Sac à Main Cuir Premium",
    price: 199.99,
    originalPrice: 249.99,
    category: "Mode",
    image:
      "https://readdy.ai/api/search-image?query=premium%20leather%20handbag%20on%20clean%20white%20background%2C%20luxury%20fashion%20accessory%20with%20golden%20hardware%2C%20elegant%20design%2C%20professional%20product%20photography%20style&width=400&height=400&seq=bag2&orientation=squarish",
    rating: 4.9,
    reviews: 89,
    description:
      "Sac business en cuir pleine fleur, finitions soignées et grande capacité.",
    specs: [
      { label: "Matière", value: "Cuir pleine fleur" },
      { label: "Couleur", value: "Noir" },
    ],
    brand: "Louis Vuitton",
    colors: ["noir"],
    sizes: [],
  },
  {
    id: 3,
    name: "Baskets Sport Innovation",
    price: 149.99,
    originalPrice: 199.99,
    category: "Sport",
    image:
      "https://readdy.ai/api/search-image?query=modern%20athletic%20sneakers%20on%20white%20background%2C%20innovative%20sporty%20design%20with%20premium%20materials%2C%20contemporary%20running%20shoes%2C%20clean%20product%20photography&width=400&height=400&seq=shoes2&orientation=squarish",
    rating: 4.7,
    reviews: 156,
    description:
      "Chaussures de sport légères avec amorti avancé pour de hautes performances.",
    specs: [
      { label: "Poids", value: "240 g" },
      { label: "Semelle", value: "Mousse réactive" },
    ],
    brand: "Nike",
    colors: ["noir", "blanc"],
    sizes: ["40", "41", "42", "43"],
  },
  {
    id: 4,
    name: "Casque Audio Wireless Pro",
    price: 249.99,
    originalPrice: 299.99,
    category: "Technologie",
    image:
      "https://readdy.ai/api/search-image?query=professional%20wireless%20headphones%20on%20white%20background%2C%20premium%20audio%20equipment%20with%20sleek%20black%20design%2C%20modern%20tech%20product%20photography%2C%20minimalist%20style&width=400&height=400&seq=headphones2&orientation=squarish",
    rating: 4.8,
    reviews: 203,
    description:
      "Casque sans fil avec réduction de bruit active et autonomie prolongée.",
    specs: [
      { label: "Autonomie", value: "35 h" },
      { label: "Codecs", value: "AAC, aptX" },
    ],
  },
  {
    id: 5,
    name: "Smartphone Dernière Génération",
    price: 699.99,
    originalPrice: 799.99,
    category: "Technologie",
    image:
      "https://readdy.ai/api/search-image?query=latest%20generation%20smartphone%20on%20pure%20white%20background%2C%20sleek%20modern%20mobile%20device%2C%20premium%20technology%20product%2C%20professional%20clean%20photography%20style&width=400&height=400&seq=phone1&orientation=squarish",
    rating: 4.9,
    reviews: 312,
    description:
      "Écran OLED, triple capteur photo et processeur haute performance.",
    specs: [
      { label: "Écran", value: '6.5" OLED' },
      { label: "Stockage", value: "256 Go" },
    ],
  },
  {
    id: 6,
    name: "Veste Élégante Automne",
    price: 179.99,
    originalPrice: 229.99,
    category: "Mode",
    image:
      "https://readdy.ai/api/search-image?query=elegant%20autumn%20jacket%20on%20white%20background%2C%20stylish%20outerwear%20garment%2C%20premium%20fashion%20clothing%2C%20sophisticated%20design%20with%20clean%20product%20photography&width=400&height=400&seq=jacket1&orientation=squarish",
    rating: 4.6,
    reviews: 78,
    brand: "Lacoste",
    colors: ["bleu marine", "noir"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Lampe Design Moderne",
    price: 89.99,
    originalPrice: 119.99,
    category: "Maison",
    image:
      "https://readdy.ai/api/search-image?query=modern%20design%20lamp%20on%20white%20background%2C%20contemporary%20home%20lighting%20fixture%2C%20minimalist%20interior%20decoration%2C%20elegant%20household%20accessory%20with%20clean%20aesthetics&width=400&height=400&seq=lamp1&orientation=squarish",
    rating: 4.5,
    reviews: 92,
  },
  {
    id: 8,
    name: "Tapis de Yoga Premium",
    price: 59.99,
    originalPrice: 79.99,
    category: "Sport",
    image:
      "https://readdy.ai/api/search-image?query=premium%20yoga%20mat%20on%20white%20background%2C%20high%20quality%20exercise%20equipment%2C%20modern%20fitness%20accessory%2C%20clean%20sports%20product%20photography%20with%20minimalist%20style&width=400&height=400&seq=yoga1&orientation=squarish",
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 9,
    name: "Ordinateur Portable Ultrabook",
    price: 899.99,
    originalPrice: 999.99,
    category: "Technologie",
    image:
      "https://readdy.ai/api/search-image?query=premium%20ultrabook%20laptop%20on%20white%20background%2C%20sleek%20aluminum%20design%2C%20modern%20technology%20product%20photography&width=400&height=400&seq=laptop1&orientation=squarish",
    rating: 4.8,
    reviews: 210,
  },
  {
    id: 10,
    name: "Parfum Haut de Gamme",
    price: 129.99,
    originalPrice: 159.99,
    category: "Mode",
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20on%20white%20background%2C%20premium%20fragrance%20product%20photography&width=400&height=400&seq=perfume1&orientation=squarish",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 11,
    name: "Tablette Graphique Pro",
    price: 349.99,
    originalPrice: 399.99,
    category: "Technologie",
    image:
      "https://readdy.ai/api/search-image?query=professional%20graphics%20tablet%20on%20white%20background%2C%20digital%20artist%20equipment%2C%20premium%20product%20photography&width=400&height=400&seq=tablet1&orientation=squarish",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 12,
    name: "Chaise de Bureau Ergonomique",
    price: 259.99,
    originalPrice: 299.99,
    category: "Maison",
    image:
      "https://readdy.ai/api/search-image?query=premium%20ergonomic%20office%20chair%20on%20white%20background%2C%20modern%20home%20office%20furniture%20product%20photography&width=400&height=400&seq=chair1&orientation=squarish",
    rating: 4.5,
    reviews: 76,
  },
];

export function getProductById(id: number): ProductItem | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(
  category: ProductItem["category"],
  excludeId: number,
  limit: number = 4
): ProductItem[] {
  return products
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, limit);
}
