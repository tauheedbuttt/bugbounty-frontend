import apiClient, { getErrorMessage } from "..";
import { ReportsQuery, HackerReportCreateData } from "@/types/hacker/report";

export const getHackerReports = async (params: ReportsQuery) => {
  try {
    const response = await apiClient.get(`hacker/report`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getHackerReportsSeverities = async () => {
  try {
    const response = await apiClient.get(`hacker/report/severities`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getHackerReportsMonthly = async () => {
  try {
    const response = await apiClient.get(`hacker/report/monthly`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const addHackerReport = async (data: HackerReportCreateData) => {
  try {
    const response = await apiClient.post(`hacker/report/add`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
