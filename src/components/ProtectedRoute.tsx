import { ROUTE_PATHS } from "@/constants/routes";
import { getBasePath } from "@/hooks/use-base-path";
import { useToken } from "@/hooks/use-token";
import { LOCAL_STORAGE, ROLE_TYPES } from "@/lib/enums";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ROLE_TYPES[];
  requireAuth?: boolean;
  isAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
  isAuth = false,
}) => {
  const { isLoading, role, token, adminRole, programRole } = useToken();
  const getPath = () => {
    const lsData = localStorage.getItem(LOCAL_STORAGE.REPORT_AFTER_AUTH);
    const goToReport = lsData && !adminRole && !programRole;
    const data = goToReport ? JSON.parse(lsData) : null;
    const path = data?.from ?? getBasePath(role, adminRole, programRole);

    return { path, data };
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="h-10 w-10 stroke-blue-500 text-muted-foreground animate-spin" />
      </div>
    );

  if (requireAuth && (!token || !role)) {
    return (
      <Navigate
        to={ROUTE_PATHS.HACKER_LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  if (isAuth && token && allowedRoles?.includes(role)) {
    return <Navigate to={getPath().path} replace state={getPath().data} />;
  }

  if (allowedRoles && token && !allowedRoles.includes(role)) {
    return <Navigate to={getPath().path} replace state={getPath().data} />;
  }

  return <>{children}</>;
};
