import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProgram from "../pages/AdminCreateProgram";
import AdminProgramManagement from "../pages/AdminProgramManagement";
import AdminResearcherManagement from "../pages/AdminResearcherManagement";
import AdminReports from "../pages/AdminReports";
import AdminHackerManagement from "../pages/AdminHackerManagement";
import AdminAdminManagement from "../pages/AdminAdminManagement";
import ReportDetails from "../pages/ReportDetails";
import { ADMIN_ROLES, ROLE_TYPES } from "@/lib/enums";

const allRoles = Object.values(ADMIN_ROLES);
const readerAndSuperADmin = [ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin];

export const adminRoutes = [
  {
    allowedAdminRoles: allRoles,
    path: "/admin/reports",
    element: <AdminReports />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: "/admin/programs",
    element: <AdminProgramManagement />,
  },
  {
    allowedAdminRoles: [ADMIN_ROLES.SuperAdmin],
    path: "/admin/programs/create",
    element: <AdminCreateProgram />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: "/admin/researchers",
    element: <AdminResearcherManagement />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: "/admin/admins",
    element: <AdminAdminManagement />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: "/admin/hackers",
    element: <AdminHackerManagement />,
  },
  {
    allowedAdminRoles: allRoles,
    path: "/admin/reports/:reportId",
    element: <ReportDetails />,
  },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Admin] }));
