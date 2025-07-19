import Index from "../pages/Index";
import Leaderboard from "../pages/Leaderboard";
import Programs from "../pages/Programs";
import ProgramDetails from "../pages/ProgramDetails";
import SubmitReport from "../pages/SubmitReport";
import Reports from "../pages/Reports";
import Bounties from "../pages/Bounties";
import Profile from "../pages/Profile";
import ResearcherProfile from "../pages/ResearcherProfile";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import { ROLE_TYPES } from "@/lib/enums";
import ReportDetails from "@/pages/ReportDetails";

export const hackerRoutes = [
  { path: "/@:handle/", element: <ResearcherProfile /> },
  { path: "/dashboard", element: <Index /> },
  { path: "/settings", element: <AccountSettingsPage /> },
  { path: "/leaderboard", element: <Leaderboard /> },
  { path: "/programs", element: <Programs /> },
  { path: "/programs/:id", element: <ProgramDetails /> },
  { path: "/programs/:id/submit", element: <SubmitReport /> },
  { path: "/reports", element: <Reports /> },
  { path: "/reports/:reportId", element: <ReportDetails /> },
  { path: "/bounties", element: <Bounties /> },
  { path: "/profile", element: <Profile /> },
].map((item) => ({ ...item, allowedRoles: [ROLE_TYPES.Hacker] }));
