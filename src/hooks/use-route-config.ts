import { ROUTE_PATHS } from "@/constants/routes";
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
    const landingPages = Object.values(ROUTE_PATHS.LANDING);
    // Landing page
    if (landingPages.includes(pathname as any)) {
      return { layoutType: "landing" };
    }

    // Authentication pages
    if (
      pathname.match(
        /^\/(researcher|program|admin)\/(login|signup|forgot-password)/
      ) ||
      pathname.match(/^\/(Researcher|Program|Admin)\/(reset)/) ||
      pathname.match(/^\/(Researcher|Program|Admin)\/(2fa)/)
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
