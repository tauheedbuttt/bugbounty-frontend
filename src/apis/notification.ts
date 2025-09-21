import { BaseQueryParams } from "@/lib/types";
import apiClient, { getErrorMessage } from ".";

export const getNotifications = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`notification`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getNotificationSeen = async () => {
  try {
    const response = await apiClient.get(`notification/seen`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const seenNotifications = async (data: { id: string }) => {
  try {
    const response = await apiClient.patch(`notification/seen`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
