import apiClient, { getErrorMessage } from "..";
import {
  AdminDeleteData,
  AdminInviteUserData,
  AdminRoleData,
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

export const getAdminUsersResearcherStats = async () => {
  try {
    const response = await apiClient.get(`admin/user/researcher/stats`);
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

export const inviteAdminUser = async (data: AdminInviteUserData) => {
  try {
    const response = await apiClient.post(`admin/user/invite`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteAdminUser = async (data: AdminDeleteData) => {
  try {
    const response = await apiClient.delete(`admin/user/delete/${data.id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const roleAdminUser = async (data: AdminRoleData) => {
  try {
    const response = await apiClient.patch(`admin/user/role`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
