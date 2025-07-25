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

export const getAdminReportStats = async () => {
  try {
    const response = await apiClient.get(`admin/report/stats`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProgramReportStats = async () => {
  try {
    const response = await apiClient.get(`admin/report/program/stats`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProgramAnalytics = async () => {
  try {
    const response = await apiClient.get(`report/program/analytics`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
