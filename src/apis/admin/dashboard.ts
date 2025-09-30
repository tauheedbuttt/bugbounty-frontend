import apiClient, { getErrorMessage } from "..";

export const getAdminDashboard = async () => {
  try {
    const response = await apiClient.get(`admin/dashboard`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getAdminDashboardMonthlyReports = async () => {
  try {
    const response = await apiClient.get(`admin/dashboard/monthly`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getAdminDashboardHackers = async () => {
  try {
    const response = await apiClient.get(`admin/dashboard/hackers`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
