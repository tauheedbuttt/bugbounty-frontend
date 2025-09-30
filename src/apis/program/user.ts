import { BaseQueryParams } from "@/lib/types";
import apiClient, { getErrorMessage } from "..";
import {
  ProgramDeleteData,
  ProgramInviteUserData,
  ProgramRoleData,
  UsersQuery,
} from "@/types/program/user";

export const getProgramUsers = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`program/user`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProgramResearchers = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`program/user/researchers`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const inviteProgramUser = async (data: ProgramInviteUserData) => {
  try {
    const response = await apiClient.post(`program/user/invite`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteProgramUser = async (data: ProgramDeleteData) => {
  try {
    const response = await apiClient.delete(`program/user/delete/${data.id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateProgramUser = async (data: ProgramRoleData) => {
  try {
    const response = await apiClient.patch(`program/user/update`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
