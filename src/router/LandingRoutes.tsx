import { ROUTE_PATHS } from "@/constants/routes";
import NotFound from "@/pages/NotFound";
import HallOfFame from "@/pages/HallOfFame";
import Leaderboard from "@/pages/Leaderboard";
import Programs from "@/pages/Programs";
import Landing from "@/pages/Landing";

export const landingRoutes = [
  { path: ROUTE_PATHS.LANDING.LANDING, element: <Landing /> },
  { path: ROUTE_PATHS.LANDING.PROGRAMS, element: <Programs /> },
  { path: ROUTE_PATHS.LANDING.LEADERBOARD, element: <Leaderboard /> },
  { path: ROUTE_PATHS.LANDING.HALL_OF_FAME, element: <HallOfFame /> },
  { path: "*", element: <NotFound /> },
];
