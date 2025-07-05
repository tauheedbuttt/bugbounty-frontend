import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export type LayoutType = "landing" | "auth" | "dashboard";
export type UserType = "hacker" | "program" | "admin";

interface RouteConfig {
  layoutType: LayoutType;
  userType?: UserType;
  sidebarType?: "app" | "program" | "admin";
}

export const useRouteConfig = (): RouteConfig => {
  const location = useLocation();
  const pathname = location.pathname;

  return useMemo(() => {
    // Landing page
    if (pathname === "/") {
      return { layoutType: "landing" };
    }

    // Authentication pages
    if (
      pathname.match(
        /^\/(hacker|program|admin)\/(login|signup|forgot-password)/
      ) ||
      pathname.match(/^\/(Hacker|Program|Admin)\/(reset)/)
    ) {
      return { layoutType: "auth" };
    }

    // Admin pages
    if (pathname.startsWith("/admin")) {
      return {
        layoutType: "dashboard",
        userType: "admin",
        sidebarType: "admin",
      };
    }

    // Program-specific pages
    if (
      pathname.match(/^\/[^\/]+\/(reports|analytics|payments|triagers|report)/)
    ) {
      return {
        layoutType: "dashboard",
        userType: "program",
        sidebarType: "program",
      };
    }

    // Default dashboard (hacker/researcher)
    return {
      layoutType: "dashboard",
      userType: "hacker",
      sidebarType: "app",
    };
  }, [pathname]);
};
