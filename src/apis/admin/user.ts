import apiClient, { getErrorMessage } from "..";
import {
  AdminUserBanData,
  AdminUserBlueBadgeData,
  UsersQuery,
} from "@/types/admin/user";

export const getAdminUsers = async (params: UsersQuery) => {
  try {
    const response = await apiClient.get(`admin/user`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateAdminBlueBadge = async (data: AdminUserBlueBadgeData) => {
  try {
    const response = await apiClient.patch(`admin/user/blue-badge`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const banAdminUser = async (data: AdminUserBanData) => {
  try {
    const response = await apiClient.patch(`admin/user/ban`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
