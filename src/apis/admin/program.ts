import { LoginData } from "@/types/auth";
import apiClient, { getErrorMessage } from "..";
import {
  AdminProgramActionsData,
  AdminProgramCreateData,
  AdminProgramDeleteData,
  ProgramsQuery,
} from "@/types/admin/program";

export const getAdminPrograms = async (params: ProgramsQuery) => {
  try {
    const response = await apiClient.get(`admin/program`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getAdminProgramStats = async () => {
  try {
    const response = await apiClient.get(`admin/program/stats`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const addAdminProgram = async (data: AdminProgramCreateData) => {
  try {
    const response = await apiClient.post(`admin/program/add`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const actionsAdminProgram = async (data: AdminProgramActionsData) => {
  try {
    const response = await apiClient.patch(`admin/program/actions`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateAdminProgram = async (data: AdminProgramCreateData) => {
  try {
    const response = await apiClient.put(
      `admin/program/update/${data._id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteAdminProgram = async (
  credentials: AdminProgramDeleteData
) => {
  try {
    const response = await apiClient.delete(`admin/program/delete`, {
      params: credentials,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
