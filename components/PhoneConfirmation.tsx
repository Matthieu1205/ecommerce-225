"use client";

interface PhoneConfirmationProps {
  selectedMethod: string;
  paymentPhone: string;
  onPhoneChange: (phone: string) => void;
}

export default function PhoneConfirmation({
  selectedMethod,
  paymentPhone,
  onPhoneChange,
}: PhoneConfirmationProps) {
  const getMethodName = () => {
    switch (selectedMethod) {
      case "wave":
        return "Wave";
      case "orange_money":
        return "Orange Money";
      default:
        return "Mobile Money";
    }
  };

  const getMethodColor = () => {
    switch (selectedMethod) {
      case "wave":
        return "border-green-200 bg-green-50";
      case "orange_money":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getMethodIcon = () => {
    switch (selectedMethod) {
      case "wave":
        return (
          <img
            src="/logos/images.jpeg"
            alt="Wave"
            className="w-6 h-6 object-contain rounded"
          />
        );
      case "orange_money":
        return (
          <img
            src="/logos/orange_ci.png"
            alt="Orange Money"
            className="w-6 h-6 object-contain rounded"
          />
        );
      default:
        return <i className="ri-smartphone-line"></i>;
    }
  };

  return (
    <div className={`mt-6 p-4 border rounded-xl ${getMethodColor()}`}>
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-2xl">{getMethodIcon()}</span>
        <h3 className="font-semibold text-gray-900">
          Confirmation du paiement {getMethodName()}
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Saisissez le numéro de téléphone associé à votre compte{" "}
        {getMethodName()} pour confirmer le paiement.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numéro de téléphone pour le paiement *
        </label>
        <input
          type="tel"
          value={paymentPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+225 XX XX XX XX"
          required
        />
        <p className="text-xs text-gray-500 mt-2">
          Format: +225 XX XX XX XX (ex: +225 07 12 34 56 78)
        </p>
      </div>

      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-xs text-gray-600">
            Votre paiement sera sécurisé et protégé par {getMethodName()}
          </p>
        </div>
      </div>
    </div>
  );
}
