import { ROUTE_PATHS } from "@/constants/routes";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { match } from "path-to-regexp";

export type LayoutType = "landing" | "auth" | "dashboard";
export type UserType = "hacker" | "program" | "admin";

interface RouteConfig {
  layoutType: LayoutType;
  userType?: UserType;
  sidebarType?: "app" | "program" | "admin";
}

const landingPages = Object.values(ROUTE_PATHS.LANDING);

export const isMatchingPath = (pattern: string, pathname: string) => {
  const matcher = match(pattern, { decode: decodeURIComponent });
  return matcher(pathname) !== false;
};

export const getLayoutType = (pathname: string) => {
  for (const routePattern of landingPages) {
    if (isMatchingPath(routePattern, pathname)) {
      return { layoutType: "landing" };
    }
  }

  return { layoutType: "default" }; // or whatever fallback
};

export const useRouteConfig = (): RouteConfig => {
  const location = useLocation();
  const pathname = location.pathname;

  return useMemo(() => {
    // Landing page
    if (getLayoutType(pathname).layoutType === "landing") {
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
