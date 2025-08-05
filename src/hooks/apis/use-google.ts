import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./use-auth";
import { ROLE_TYPES } from "@/lib/enums";

export const useGoogle = () => {
  const { useGoogleLogin: useGoogleLoginHook } = useAuth(ROLE_TYPES.Hacker);

  const { mutate: googleLoginApi, isPending } = useGoogleLoginHook;

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => googleLoginApi({ code: codeResponse.code }),
    flow: "auth-code",
  });

  return {
    googleLogin,
    isPending,
  };
};
