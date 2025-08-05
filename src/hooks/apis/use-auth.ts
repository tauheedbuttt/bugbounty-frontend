import {
  authenticatedVerify2fa,
  forgot,
  getProfile,
  getSession,
  googleLogin,
  login,
  qr,
  reset,
  signup,
  updateProfile,
  updateProfileImage,
  username,
  verify2fa,
} from "@/apis/auth";
import { queryKey } from "@/constants/queryKeys";
import { rolesBase2FaPath } from "@/lib/constant";
import {
  ADMIN_ROLES,
  LOCAL_STORAGE,
  PROGRAM_ROLES,
  ROLE_TYPES,
} from "@/lib/enums";
import { BaseQueryParams } from "@/lib/types";
import { useAuthStore } from "@/stores/auth";
import {
  AuthenticatedVerify2faData,
  ChangePasswordData,
  ForgotPasswordData,
  GoogleLoginData,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBasePath } from "../use-base-path";
import useGetQuery from "../use-get-query";
import { toast } from "../use-toast";
import { useTranslation } from "../use-translation";

export const useAuth = (role: ROLE_TYPES) => {
  const { t } = useTranslation();
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
    const lsData = localStorage.getItem(LOCAL_STORAGE.REPORT_AFTER_AUTH);
    const goToReport = lsData && !adminRole && !programRole;
    const data = goToReport ? JSON.parse(lsData) : null;
    const path = data?.from ?? getBasePath(role, adminRole, programRole);
    navigate(path, { replace: true, state: goToReport ? data : undefined });
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
        navigate(state?.from ?? path, {
          state: { email: data.data.email },
        });
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
        description: t.common.messages.please_check_your_input_and_try_again,
        variant: "destructive",
      });
    },
  });

  const useGoogleLogin = useMutation({
    mutationFn: (data: Omit<GoogleLoginData, "browser">) =>
      googleLogin({ ...data, browser }),
    onSuccess: (data: LoginResponse) => {
      if (data.data.is2FA) {
        const path = rolesBase2FaPath[role];
        navigate(state?.from ?? path, {
          state: { email: data.data.email },
        });
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
        description: t.common.messages.please_check_your_input_and_try_again,
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
      navigateAfterLogin(data.data?.adminRole, data.data?.programRole);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: t.common.messages.please_check_your_input_and_try_again,
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
        title: t.common.messages.profile_updated,
        description: t.common.messages.your_profile_has_been_updated,
      });
    },
    onError: (error) => {
      setUsernameError(error.message);
    },
  });

  const useUpdateProfileImage = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfileImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.PROFILE] });
      toast({
        title: t.common.messages.profile_updated,
        description: t.common.messages.your_profile_has_been_updated,
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
        queryClient.invalidateQueries({ queryKey: [queryKey.PROFILE] });
        toast({
          title: t.common.messages.password_changed,
          description: t.common.messages.password_changed_successfully,
        });
        onSuccess();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: t.common.messages.please_check_your_input_and_try_again,
          variant: "destructive",
        });
      },
    });

  const useForgotPassword = (onSuccess: VoidFunction) =>
    useMutation({
      mutationFn: (data: ForgotPasswordData) => forgot(data),
      onSuccess: (data: LoginResponse) => {
        toast({
          title: t.common.messages.email_sent,
          description:
            t.common.messages.link_to_reset_your_password_has_been_sent,
        });
        onSuccess();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: t.common.messages.please_check_your_input_and_try_again,
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
          description: t.common.messages.please_check_your_input_and_try_again,
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
          title: t.common.messages["2fa_enabled"],
          description:
            t.common.messages
              .twofactor_authentication_has_been_successfully_enabled,
        });
        onSuccess();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: t.common.messages.please_check_your_input_and_try_again,
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
          description: t.common.messages.please_check_your_input_and_try_again,
          variant: "destructive",
        });
      },
    });

  return {
    useGetSession,
    useGetProfile,
    useLogin,
    useGoogleLogin,
    useSignup,
    useUsername,
    useUpdateProfile,
    useUpdateProfileImage,
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
