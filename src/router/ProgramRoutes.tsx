import ProgramReports from "../pages/ProgramReports";
import ProgramAnalytics from "../pages/ProgramAnalytics";
import ProgramPayments from "../pages/ProgramPayments";
import ProgramTriagersManagementPage from "../pages/ProgramTriagersManagementPage";
import ReportDetails from "../pages/ReportDetails";
import { PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";

export const programRoutes = [
  {
    allowedProgramRoles: [
      PROGRAM_ROLES.SuperAdmin,
      PROGRAM_ROLES.ViewerAdmin,
      PROGRAM_ROLES.Triager,
    ],
    path: "/program/reports",
    element: <ProgramReports />,
  },
  {
    allowedProgramRoles: [
      PROGRAM_ROLES.SuperAdmin,
      PROGRAM_ROLES.ViewerAdmin,
      PROGRAM_ROLES.Triager,
    ],
    path: "/program/report/:reportId",
    element: <ReportDetails />,
  },
  {
    allowedProgramRoles: [PROGRAM_ROLES.SuperAdmin, PROGRAM_ROLES.ViewerAdmin],
    path: "/program/triagers",
    element: <ProgramTriagersManagementPage />,
  },
  {
    allowedProgramRoles: [
      PROGRAM_ROLES.SuperAdmin,
      PROGRAM_ROLES.ViewerAdmin,
      PROGRAM_ROLES.Triager,
    ],
    path: "/program/analytics",
    element: <ProgramAnalytics />,
  },
  {
    allowedProgramRoles: [
      PROGRAM_ROLES.SuperAdmin,
      PROGRAM_ROLES.ViewerAdmin,
      PROGRAM_ROLES.Accountant,
    ],
    path: "/program/payments",
    element: <ProgramPayments />,
  },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Program] }));
