import { Routes, Route } from "react-router-dom";
import HackerLogin from "../pages/HackerLogin";
import HackerSignup from "../pages/HackerSignup";
import ProgramLogin from "../pages/ProgramLogin";
import AdminLoginPage from "../pages/AdminLoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ROLE_TYPES } from "@/lib/enums";
import Verify2FAPage from "@/pages/Verify2FAPage";
import { ROUTE_PATHS } from "@/constants/routes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileDropdown } from "@/components/ProfileDropdown";

const hackerAuth = [
  { path: ROUTE_PATHS.HACKER_LOGIN, element: <HackerLogin /> },
  { path: ROUTE_PATHS.HACKER_SIGNUP, element: <HackerSignup /> },
  { path: ROUTE_PATHS.HACKER_FORGOT_PASSWORD, element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Hacker] }));

const programAuth = [
  { path: ROUTE_PATHS.PROGRAM_LOGIN, element: <ProgramLogin /> },
  { path: ROUTE_PATHS.PROGRAM_FORGOT_PASSWORD, element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Program] }));

const adminAuth = [
  { path: ROUTE_PATHS.ADMIN_LOGIN, element: <AdminLoginPage /> },
  { path: ROUTE_PATHS.ADMIN_FORGOT_PASSWORD, element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Admin] }));

export const AuthLayout = () => {
  const routes = [...hackerAuth, ...programAuth, ...adminAuth];
  return (
    <Routes>
      <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTE_PATHS.MFA} element={<Verify2FAPage />} />
      {routes.map(({ path, element, allowedRoles }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute
              isAuth
              requireAuth={false}
              allowedRoles={allowedRoles}
            >
              <main className="flex-1 overflow-auto">
                <div className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between">
                  <div></div>
                  <div className="flex flex-row gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
                {element}
              </main>
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
