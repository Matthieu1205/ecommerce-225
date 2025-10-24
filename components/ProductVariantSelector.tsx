"use client";

import { useState } from "react";

interface Props {
  colors?: string[];
  sizes?: string[];
  onChange: (sel: { color?: string; size?: string; valid: boolean }) => void;
}

export default function ProductVariantSelector({ colors = [], sizes = [], onChange }: Props) {
  const [color, setColor] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();

  const needColor = colors.length > 0;
  const needSize = sizes.length > 0;
  const valid = (!needColor || !!color) && (!needSize || !!size);

  const notify = (c?: string, s?: string) => {
    onChange({ color: c, size: s, valid: (!needColor || !!c) && (!needSize || !!s) });
  };

  return (
    <div className="space-y-4">
      {needColor && (
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">Couleurs</div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setColor(c); notify(c, size); }}
                className={`px-3 py-1 rounded-full border text-sm ${color === c ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300'}`}
                title={c}
                aria-label={`Choisir la couleur ${c}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {needSize && (
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">Tailles</div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setSize(s); notify(color, s); }}
                className={`px-3 py-1 rounded-md border text-sm ${size === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
                title={s}
                aria-label={`Choisir la taille ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      {!valid && (
        <div className="text-sm text-red-600">Veuillez sélectionner {needColor && !color ? 'une couleur' : ''}{needColor && needSize && !color && !size ? ' et ' : ''}{needSize && !size ? 'une taille' : ''}.</div>
      )}
    </div>
  );
}


