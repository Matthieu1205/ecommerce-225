"use client";

import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    colors?: string[];
    sizes?: string[];
  } | null;
  onConfirm: (selection: { color?: string; size?: string }) => void;
}

export default function ProductQuickSelect({ open, onClose, product, onConfirm }: Props) {
  const [color, setColor] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const needColor = !!product?.colors?.length;
  const needSize = !!product?.sizes?.length;
  const isValid = (!needColor || !!color) && (!needSize || !!size);

  useEffect(() => {
    if (!open) {
      setColor(undefined);
      setSize(undefined);
    }
  }, [open]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          aria-label="Fermer"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        <div className="flex items-center gap-4 mb-4">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
          <div>
            <div className="font-semibold text-gray-900">{product.name}</div>
            <div className="text-gray-600">{product.price.toLocaleString()} F CFA</div>
          </div>
        </div>

        {needColor && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-900 mb-2">Couleurs</div>
            <div className="flex flex-wrap gap-2">
              {(product.colors || []).map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 rounded-full border text-sm ${color === c ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {needSize && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-900 mb-2">Tailles</div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || []).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 rounded-md border text-sm ${size === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isValid && (
          <div className="text-sm text-red-600 mb-2">Veuillez sélectionner {needColor && !color ? 'une couleur' : ''}{needColor && needSize && !color && !size ? ' et ' : ''}{needSize && !size ? 'une taille' : ''}.</div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => isValid && onConfirm({ color, size })}
            className={`flex-1 py-3 rounded-xl text-white ${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isValid}
          >
            Confirmer
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border">Annuler</button>
        </div>
      </div>
    </div>
  );
}


