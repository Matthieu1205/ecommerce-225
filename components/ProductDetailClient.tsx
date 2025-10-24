"use client";

import { useState } from "react";
import ProductVariantSelector from "./ProductVariantSelector";
import ProductBuyActions from "./ProductBuyActions";
import { ProductItem } from "../lib/data/products";

export default function ProductDetailClient({ product }: { product: ProductItem }) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const needColor = !!product.colors?.length;
  const needSize = !!product.sizes?.length;

  return (
    <div className="space-y-6">
      <ProductVariantSelector
        colors={product.colors}
        sizes={product.sizes}
        onChange={({ color, size }) => {
          setSelectedColor(color);
          setSelectedSize(size);
        }}
      />

      <ProductBuyActions
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        requireSelection={needColor || needSize}
        requireColor={needColor}
        requireSize={needSize}
      />
    </div>
  );
}


