export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface WavePaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  message?: string;
}

export interface OrangeMoneyPaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  message?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  paymentMethod: "wave" | "orange_money";
  amount: number;
  status: "pending" | "completed" | "failed";
  error?: string;
  message?: string;
}

