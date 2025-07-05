import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  forgot,
  getProfile,
  getSession,
  login,
  reset,
  signup,
  updateProfile,
  username,
} from "@/apis/auth";
import { ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import {
  ChangePasswordData,
  ForgotPasswordData,
  LoginData,
  LoginResponse,
  ProfileResponse,
  SessionResponse,
  SignupData,
  UpdateProfileData,
  UsernameData,
  UsernameResponse,
  UsernameStatus,
} from "@/types/auth";
import { useState } from "react";
import { rolesBasePath } from "@/lib/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "../use-toast";
import useGetQuery from "../use-get-query";
import { queryKey } from "@/constants/queryKeys";
import { BaseQueryParams } from "@/lib/types";

export const useAuth = (role: ROLE_TYPES) => {
  const { login: loginState } = useAuthStore();
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [usernameError, setUsernameError] = useState<string>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const browser = navigator.userAgent;

  const useGetProfile = ({
    onSuccess,
  }: {
    onSuccess?: (data: ProfileResponse) => void;
  }) => {
    return useGetQuery<ProfileResponse, any>({
      queryKey: queryKey.PROFILE,
      queryFn: getProfile,
      params: {},
      onSuccess,
    });
  };

  const useGetSession = ({
    params,
    onSuccess,
  }: {
    params: BaseQueryParams;
    onSuccess?: (data: SessionResponse) => void;
  }) => {
    return useGetQuery<SessionResponse, any>({
      queryKey: queryKey.SESSION,
      queryFn: () => getSession(params),
      params,
      onSuccess,
    });
  };

  const useLogin = useMutation({
    mutationFn: (data: Omit<LoginData, "browser">) =>
      login({ ...data, browser }, role),
    onSuccess: (data: LoginResponse) => {
      loginState(data.data.token, role);
      const path = rolesBasePath[role];
      navigate(state?.from ?? path);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  const useSignup = useMutation({
    mutationFn: (data: SignupData) => signup(data, role),
    onSuccess: (data: LoginResponse) => {
      loginState(data.data.token, role);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  const useUsername = useMutation({
    mutationFn: (data: UsernameData) => username(data, role),
    onSuccess: (data: UsernameResponse) => {
      const isAvailable = data.data.available;
      setUsernameStatus(isAvailable ? "available" : "taken");
      setUsernameError(undefined);
    },
    onError: (error) => {
      setUsernameError(error.message);
    },
  });

  const useUpdateProfile = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.PROFILE] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      });
    },
    onError: (error) => {
      setUsernameError(error.message);
    },
  });

  const useChangePassword = (onSuccess: VoidFunction) =>
    useMutation({
      mutationFn: (data: ChangePasswordData) => reset(data),
      onSuccess: (data: LoginResponse) => {
        toast({
          title: "Password Changed",
          description: "Password Changed Successfully.",
        });
        onSuccess();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      },
    });

  const useForgotPassword = (onSuccess: VoidFunction) =>
    useMutation({
      mutationFn: (data: ForgotPasswordData) => forgot(data),
      onSuccess: (data: LoginResponse) => {
        toast({
          title: "Email sent",
          description:
            "Link to reset your password has been sent to your email.",
        });
        onSuccess();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      },
    });

  return {
    useGetSession,
    useGetProfile,
    useLogin,
    useSignup,
    useUsername,
    useUpdateProfile,
    usernameStatus,
    usernameError,
    setUsernameStatus,
    setUsernameError,
    useChangePassword,
    useForgotPassword,
  };
};
