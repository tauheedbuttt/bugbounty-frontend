import ProgramReports from "../pages/ProgramReports";
import ProgramAnalytics from "../pages/ProgramAnalytics";
import ProgramPayments from "../pages/ProgramPayments";
import ProgramTriagersManagementPage from "../pages/ProgramTriagersManagementPage";
import ReportDetails from "../pages/ReportDetails";
import NotFound from "../pages/NotFound";
import { ROLE_TYPES } from "@/lib/enums";

export const programRoutes = [
  { path: "/:programName/reports", element: <ProgramReports /> },
  {
    path: "/:programName/triagers",
    element: <ProgramTriagersManagementPage />,
  },
  { path: "/:programName/analytics", element: <ProgramAnalytics /> },
  { path: "/:programName/payments", element: <ProgramPayments /> },
  { path: "/:programName/report/:reportId", element: <ReportDetails /> },
  { path: "*", element: <NotFound /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Program] }));
