import {
  ApproveReportData,
  ChangesReportData,
  RequestMediatorData,
  ViewReportData,
} from "@/types/report";
import apiClient, { getErrorMessage } from ".";

export const getReportById = async (id: string) => {
  try {
    const response = await apiClient.get(`report/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const changesReport = async (data: ChangesReportData) => {
  try {
    const response = await apiClient.patch(`report/changes`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const approveReport = async (data: ApproveReportData) => {
  try {
    const response = await apiClient.patch(`report/approve`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const requestMediator = async (data: RequestMediatorData) => {
  try {
    const response = await apiClient.patch(`report/request`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const viewReport = async (data: ViewReportData) => {
  try {
    const response = await apiClient.patch(`report/view`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const unseenReports = async () => {
  try {
    const response = await apiClient.get(`report/unseen`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getSeverities = async () => {
  try {
    const response = await apiClient.get(`report/severities`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getStatus = async () => {
  try {
    const response = await apiClient.get(`report/status`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getTrend = async () => {
  try {
    const response = await apiClient.get(`report/trend`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
