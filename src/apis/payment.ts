import apiClient, { getErrorMessage } from ".";
import { SendPaymentData, PaymentsQuery } from "@/types/payment";

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

export const sendPayment = async (data: SendPaymentData) => {
  try {
    const response = await apiClient.post(`/payment/send`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
