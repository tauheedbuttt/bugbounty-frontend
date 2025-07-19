import { PAYMENT_STATUS } from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface PaymentsQuery extends BaseQueryParams {
  status?: PAYMENT_STATUS;
}

export interface SendPaymentData {
  amount: number;
  mtcnCode: string;
  paymentId: string;
}

export interface PaymentData {
  _id: string;
  id: string;
  report: {
    id: 1;
    name: 1;
  };
  researcher?: {
    username: 1;
  };
  status: PAYMENT_STATUS;
  amount: number;
  mtcnCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentStatsData {
  status: PAYMENT_STATUS;
  amount: number;
  count: number;
}

export type PaymentResponse = ApiResponse<{
  payment: PaginatedResponse<PaymentData>;
  stats: PaymentStatsData[];
}>;
