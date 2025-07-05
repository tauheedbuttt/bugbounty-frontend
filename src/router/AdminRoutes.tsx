import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProgram from "../pages/AdminCreateProgram";
import AdminProgramManagement from "../pages/AdminProgramManagement";
import AdminResearcherManagement from "../pages/AdminResearcherManagement";
import AdminReports from "../pages/AdminReports";
import AdminHackerManagement from "../pages/AdminHackerManagement";
import AdminAdminManagement from "../pages/AdminAdminManagement";
import ReportDetails from "../pages/ReportDetails";
import NotFound from "../pages/NotFound";
import { ROLE_TYPES } from "@/lib/enums";

export const adminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/programs", element: <AdminProgramManagement /> },
  { path: "/admin/programs/create", element: <AdminCreateProgram /> },
  { path: "/admin/researchers", element: <AdminResearcherManagement /> },
  { path: "/admin/admins", element: <AdminAdminManagement /> },
  { path: "/admin/hackers", element: <AdminHackerManagement /> },
  { path: "/admin/reports", element: <AdminReports /> },
  { path: "/admin/reports/:reportId", element: <ReportDetails /> },
  { path: "*", element: <NotFound /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Admin] }));
