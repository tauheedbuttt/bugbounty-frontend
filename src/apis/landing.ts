import { BaseQueryParams } from "@/lib/types";
import apiClient, { getErrorMessage } from ".";

export const getLandingStats = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`stats`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
