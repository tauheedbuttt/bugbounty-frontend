import apiClient, { getErrorMessage } from ".";
import { PaymentsQuery } from "@/types/payment";

export const getPayments = async (params: PaymentsQuery) => {
  try {
    const response = await apiClient.get(`/payment`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
