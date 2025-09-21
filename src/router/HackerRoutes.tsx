import Index from "../pages/Index";
import HackerLeaderboard from "../pages/HackerLeaderboard";
import HackerPrograms from "../pages/HackerPrograms";
import ProgramDetails from "../pages/HackerProgramDetails";
import SubmitReport from "../pages/SubmitReport";
import Reports from "../pages/Reports";
import Bounties from "../pages/Bounties";
import Profile from "../pages/Profile";
import ResearcherProfile from "../pages/ResearcherProfile";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import { ROLE_TYPES } from "@/lib/enums";
import ReportDetails from "@/pages/ReportDetails";
import { ROUTE_PATHS } from "@/constants/routes";
import NotificationPage from "@/pages/NotificationPage";

export const hackerRoutes = [
  { path: ROUTE_PATHS.RESEARCHER_PROFILE, element: <ResearcherProfile /> },
  { path: ROUTE_PATHS.DASHBOARD, element: <Index /> },
  { path: ROUTE_PATHS.SETTINGS, element: <AccountSettingsPage /> },
  { path: ROUTE_PATHS.HACKER_LEADERBOARD, element: <HackerLeaderboard /> },
  { path: ROUTE_PATHS.HACKER_PROGRAMS, element: <HackerPrograms /> },
  { path: ROUTE_PATHS.HACKER_PROGRAM_DETAILS, element: <ProgramDetails /> },
  { path: ROUTE_PATHS.SUBMIT_REPORT, element: <SubmitReport /> },
  { path: ROUTE_PATHS.REPORTS, element: <Reports /> },
  { path: ROUTE_PATHS.REPORTS_DETAILS, element: <ReportDetails /> },
  { path: ROUTE_PATHS.BOUNTIES, element: <Bounties /> },
  { path: ROUTE_PATHS.PROFILE, element: <Profile /> },
  { path: ROUTE_PATHS.NOTIFICATIONS, element: <NotificationPage /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Hacker] }));
