import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  ADMIN_ROLES,
  COOKIES,
  LOCAL_STORAGE,
  PROGRAM_ROLES,
  ROLE_TYPES,
} from "@/lib/enums";

export const useToken = () => {
  const {
    token: stateToken,
    role: stateRole,
    adminRole: stateAdminRole,
    programRole: stateProgramRole,
    program: stateProgram,
    programName: stateProgramName,
    programLogo: stateProgramLogo,
    login,
    logout,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [cookieToken, setCookieToken] = useState<string | undefined>(undefined);

  const storedRole = localStorage.getItem(LOCAL_STORAGE.ROLE) as ROLE_TYPES;
  const storedAdminRole = localStorage.getItem(
    LOCAL_STORAGE.ADMIN_ROLE
  ) as ADMIN_ROLES;
  const storedProgramRole = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_ROLE
  ) as PROGRAM_ROLES;
  const storedProgram = localStorage.getItem(LOCAL_STORAGE.PROGRAM) as string;
  const storedProgramName = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_NAME
  ) as string;
  const storedProgramLogo = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_LOGO
  ) as string;

  useEffect(() => {
    setIsLoading(true);
    // Simulate async cookie fetch
    const fetchCookie = async () => {
      // In reality, js-cookie is synchronous, but for demonstration:
      const token = Cookies.get(COOKIES.TOKEN);

      setCookieToken(token);
      setIsLoading(false);
      if (token)
        login({
          token,
          role: storedRole,
          adminRole: storedAdminRole,
          programRole: storedProgramRole,
          program: storedProgram,
          programName: storedProgramName,
          programLogo: storedProgramLogo,
          isOnlySet: true,
        });
    };
    fetchCookie();
  }, []);

  let token = stateToken ?? cookieToken;
  let role = stateRole ?? storedRole;
  let adminRole = stateAdminRole ?? storedAdminRole;
  let programRole = stateProgramRole ?? storedProgramRole;
  let program = stateProgram ?? storedProgram;
  let programName = stateProgramName ?? storedProgramName;
  let programLogo = stateProgramLogo ?? storedProgramLogo;

  return {
    isLoading,
    token,
    role,
    adminRole,
    programRole,
    program,
    programName,
    programLogo,
  };
};
