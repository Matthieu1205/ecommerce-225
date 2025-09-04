"use client";

import { useState } from "react";

interface PaymentMethodCardProps {
  method: {
    id: string;
    name: string;
    icon: string;
    description: string;
    enabled: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  const [imageError, setImageError] = useState(false);

  const getFallbackIcon = () => {
    switch (method.id) {
      case "wave":
        return "🌊";
      case "orange_money":
        return "🍊";
      default:
        return "💳";
    }
  };

  return (
    <div
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-gray-900 bg-gray-100"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center">
          {!imageError ? (
            <img
              src={method.icon}
              alt={`Logo ${method.name}`}
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-2xl">{getFallbackIcon()}</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{method.name}</h3>
          <p className="text-sm text-gray-600">{method.description}</p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            isSelected ? "border-gray-900 bg-gray-900" : "border-gray-300"
          }`}
        >
          {isSelected && (
            <div className="w-full h-full rounded-full bg-white scale-50"></div>
          )}
        </div>
      </div>
    </div>
  );
}
