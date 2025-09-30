import { ROLE_TYPES } from "../lib/enums";
import apiClient, { getErrorMessage } from ".";
import {
  AuthenticatedVerify2faData,
  ChangePasswordData,
  ForgotPasswordData,
  GoogleLoginData,
  LoginData,
  QRData,
  SignupData,
  UpdateProfileData,
  UsernameData,
  Verify2faData,
} from "@/types/auth";
import { BaseQueryParams } from "@/lib/types";

export const googleLogin = async (data: GoogleLoginData) => {
  try {
    const response = await apiClient.post(`auth/google`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

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

export const updateProfileImage = async (data: UpdateProfileData) => {
  try {
    const response = await apiClient.put(`auth/update/image`, data, {
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

export const qr = async () => {
  try {
    const response = await apiClient.post(`auth/qr`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const authenticatedVerify2fa = async (
  data: AuthenticatedVerify2faData
) => {
  try {
    const response = await apiClient.post(
      `auth/authenticated-verify-2fa`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const verify2fa = async (data: Verify2faData) => {
  try {
    const response = await apiClient.post(`auth/verify-2fa`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
