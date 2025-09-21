import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProgram from "../pages/AdminCreateProgram";
import AdminProgramManagement from "../pages/AdminProgramManagement";
import AdminResearcherManagement from "../pages/AdminResearcherManagement";
import AdminReports from "../pages/AdminReports";
import AdminHackerManagement from "../pages/AdminHackerManagement";
import AdminAdminManagement from "../pages/AdminAdminManagement";
import ReportDetails from "../pages/ReportDetails";
import { ADMIN_ROLES, ROLE_TYPES } from "@/lib/enums";
import { ROUTE_PATHS } from "@/constants/routes";
import AdminMediators from "@/pages/AdminMediators";

const allRoles = Object.values(ADMIN_ROLES);
const readerAndSuperADmin = [ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin];

export const adminRoutes = [
  {
    allowedAdminRoles: allRoles,
    path: ROUTE_PATHS.ADMIN_REPORTS,
    element: <AdminReports />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: ROUTE_PATHS.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: ROUTE_PATHS.ADMIN_PROGRAMS,
    element: <AdminProgramManagement />,
  },
  {
    allowedAdminRoles: [ADMIN_ROLES.SuperAdmin],
    path: ROUTE_PATHS.ADMIN_CREATE_PROGRAM,
    element: <AdminCreateProgram />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: ROUTE_PATHS.ADMIN_RESEARCHERS,
    element: <AdminResearcherManagement />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: ROUTE_PATHS.ADMIN_ADMINS,
    element: <AdminAdminManagement />,
  },
  {
    allowedAdminRoles: readerAndSuperADmin,
    path: ROUTE_PATHS.ADMIN_HACKERS,
    element: <AdminHackerManagement />,
  },
  {
    allowedAdminRoles: allRoles,
    path: ROUTE_PATHS.ADMIN_REPORT_DETAILS,
    element: <ReportDetails />,
  },
  {
    allowedAdminRoles: allRoles,
    path: ROUTE_PATHS.ADMIN_MEDIATOR,
    element: <AdminMediators />,
  },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Admin] }));
