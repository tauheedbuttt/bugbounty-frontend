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

const hackerAuth = [
  { path: "/hacker/login", element: <HackerLogin /> },
  { path: "/hacker/signup", element: <HackerSignup /> },
  { path: "/hacker/forgot-password", element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Hacker] }));

const programAuth = [
  { path: "/program/login", element: <ProgramLogin /> },
  { path: "/program/forgot-password", element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Program] }));

const adminAuth = [
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin/forgot-password", element: <ForgotPassword /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Admin] }));

export const AuthLayout = () => {
  const routes = [...hackerAuth, ...programAuth, ...adminAuth];
  return (
    <Routes>
      <Route path="/:type/reset" element={<ResetPassword />} />
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
              {element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
