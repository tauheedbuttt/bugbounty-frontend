import { ROUTE_PATHS } from '../constants/routes';

export const isLandingPage = (pathname: string): boolean => {
  return pathname === ROUTE_PATHS.LANDING;
};

export const isAuthPage = (pathname: string): boolean => {
  const authRoutes = [
    ROUTE_PATHS.HACKER_LOGIN,
    ROUTE_PATHS.HACKER_SIGNUP,
    ROUTE_PATHS.HACKER_FORGOT_PASSWORD,
    ROUTE_PATHS.PROGRAM_LOGIN,
    ROUTE_PATHS.PROGRAM_FORGOT_PASSWORD,
    ROUTE_PATHS.ADMIN_LOGIN,
    ROUTE_PATHS.ADMIN_FORGOT_PASSWORD,
  ];
  
  return authRoutes.some(route => {
    const pattern = route.replace(/:[^/]+/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(pathname);
  });
};

export const isAdminPage = (pathname: string): boolean => {
  return pathname.startsWith('/admin');
};

export const isProgramPage = (pathname: string): boolean => {
  return /^\/[^\/]+\/(reports|analytics|payments|triagers|report)/.test(pathname);
};

export const getProgramNameFromPath = (pathname: string): string | null => {
  const match = pathname.match(/^\/([^\/]+)\//);
  return match ? match[1] : null;
};
