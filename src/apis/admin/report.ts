import apiClient, { getErrorMessage } from "..";
import { ReportsQuery } from "@/types/hacker/report";

export const getAdminReports = async (params: ReportsQuery) => {
  try {
    const response = await apiClient.get(`admin/report`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
