import { PAYMENT_STATUS } from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface PaymentsQuery extends BaseQueryParams {
  status?: PAYMENT_STATUS;
}

export interface PaymentData {
  _id: string;
  id: string;
  report: {
    name: 1;
  };
  status: PAYMENT_STATUS;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentStatsData {
  status: PAYMENT_STATUS;
  amount: number;
}

export type PaymentResponse = ApiResponse<{
  payment: PaginatedResponse<PaymentData>;
  stats: PaymentStatsData[];
}>;
