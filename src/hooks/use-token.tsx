import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { COOKIES, ROLE_TYPES } from "@/lib/enums";

export const useToken = () => {
  const { token: stateToken, role: stateRole, login, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [cookieToken, setCookieToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    // Simulate async cookie fetch
    const fetchCookie = async () => {
      // In reality, js-cookie is synchronous, but for demonstration:
      const token = Cookies.get(COOKIES.TOKEN);

      setCookieToken(token);
      setIsLoading(false);
      if (token) login(token, storedRole, true);
    };
    fetchCookie();
  }, []);

  const storedRole = localStorage.getItem("role") as ROLE_TYPES;

  let token = stateToken ?? cookieToken;
  let role = stateRole ?? storedRole;

  return { isLoading, token, role };
};
