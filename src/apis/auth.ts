import { ROLE_TYPES } from "../lib/enums";
import apiClient, { getErrorMessage } from ".";
import {
  ChangePasswordData,
  ForgotPasswordData,
  LoginData,
  SignupData,
  UpdateProfileData,
  UsernameData,
} from "@/types/auth";
import { BaseQueryParams } from "@/lib/types";

export const login = async (data: LoginData, role: ROLE_TYPES) => {
  try {
    const response = await apiClient.post(`auth/${role}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const signup = async (data: SignupData, role: ROLE_TYPES) => {
  try {
    const response = await apiClient.post(`auth/${role}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const username = async (data: UsernameData, role: ROLE_TYPES) => {
  try {
    const response = await apiClient.post(`auth/${role}/username`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getSession = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`auth/session`, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get(`auth/profile`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateProfile = async (data: UpdateProfileData) => {
  try {
    const response = await apiClient.put(`auth/update`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const reset = async (data: ChangePasswordData) => {
  try {
    const response = await apiClient.put(`auth/reset`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const forgot = async (data: ForgotPasswordData) => {
  try {
    const response = await apiClient.put(`auth/forgot`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
