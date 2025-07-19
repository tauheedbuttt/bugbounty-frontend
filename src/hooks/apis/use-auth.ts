import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authenticatedVerify2fa,
  forgot,
  getProfile,
  getSession,
  login,
  qr,
  reset,
  signup,
  updateProfile,
  username,
  verify2fa,
} from "@/apis/auth";
import { ADMIN_ROLES, PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import {
  AuthenticatedVerify2faData,
  ChangePasswordData,
  ForgotPasswordData,
  LoginData,
  LoginResponse,
  ProfileResponse,
  QRData,
  QrResponse,
  SessionResponse,
  SignupData,
  UpdateProfileData,
  UsernameData,
  UsernameResponse,
  UsernameStatus,
  Verify2faData,
} from "@/types/auth";
import { useState } from "react";
import {
  adminRolesBasePath,
  rolesBase2FaPath,
  rolesBasePath,
} from "@/lib/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "../use-toast";
import useGetQuery from "../use-get-query";
import { queryKey } from "@/constants/queryKeys";
import { BaseQueryParams } from "@/lib/types";
import { getBasePath } from "../use-base-path";

export const useAuth = (role: ROLE_TYPES) => {
  const { login: loginState } = useAuthStore();
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [usernameError, setUsernameError] = useState<string>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const browser = navigator.userAgent;

  const navigateAfterLogin = (
    adminRole?: ADMIN_ROLES,
    programRole?: PROGRAM_ROLES
  ) => {
    const path = getBasePath(role, adminRole, programRole);
    navigate(path, { replace: true });
  };

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
      if (data.data.is2FA) {
        const path = rolesBase2FaPath[role];
        navigate(state?.from ?? path, { state: { email: data.data.email } });
        return;
      }
      loginState({
        ...data.data,
      });

      navigateAfterLogin(data.data?.adminRole, data.data?.programRole);

      queryClient.invalidateQueries();
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
      loginState({
        ...data.data,
      });
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

  const useGetQR = (onSuccess: (data: QRData) => void) =>
    useMutation({
      mutationFn: () => qr(),
      onSuccess: (data: QrResponse) => {
        onSuccess(data.data);
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      },
    });

  const useAuthenticatedVerify2faData = (onSuccess: VoidFunction) =>
    useMutation({
      mutationFn: (data: AuthenticatedVerify2faData) =>
        authenticatedVerify2fa(data),
      onSuccess: (data: QrResponse) => {
        queryClient.invalidateQueries({ queryKey: [queryKey.PROFILE] });
        toast({
          title: "2FA Enabled",
          description:
            "Two-factor authentication has been successfully enabled.",
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

  const useVerify2fa = (setIsError: VoidFunction) =>
    useMutation({
      mutationFn: (data: Verify2faData) => verify2fa({ ...data, browser }),
      onSuccess: (data: LoginResponse) => {
        const adminRole = data?.data?.adminRole;
        const programRole = data?.data?.programRole;
        loginState({
          ...data.data,
        });

        navigateAfterLogin(adminRole, programRole);
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        setIsError();
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
    useGetQR,
    useAuthenticatedVerify2faData,
    useVerify2fa,
  };
};
