"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "../lib/cartStore";

interface Props {
  id: number;
  name: string;
  price: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  requireSelection?: boolean;
  requireColor?: boolean;
  requireSize?: boolean;
}

export default function ProductBuyActions({ id, name, price, image, selectedColor, selectedSize, requireSelection, requireColor, requireSize }: Props) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => {
          if (requireSelection) {
            if ((requireColor && !selectedColor) || (requireSize && !selectedSize)) return;
          }
          const displayName = `${name}${selectedColor ? ` - ${selectedColor}` : ''}${selectedSize ? ` / ${selectedSize}` : ''}`;
          addItem({ id, name: displayName, price, image });
        }}
        className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
      >
        Ajouter au panier
      </button>
      <button
        onClick={() => {
          if (requireSelection) {
            if ((requireColor && !selectedColor) || (requireSize && !selectedSize)) return;
          }
          const displayName = `${name}${selectedColor ? ` - ${selectedColor}` : ''}${selectedSize ? ` / ${selectedSize}` : ''}`;
          try {
            const payload = { id, name: displayName, price, image, quantity: 1 };
            sessionStorage.setItem("buy_now_item", JSON.stringify(payload));
          } catch {}
          router.push("/payment?buynow=1");
        }}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors cursor-pointer"
      >
        Acheter maintenant
      </button>
    </div>
  );
}


