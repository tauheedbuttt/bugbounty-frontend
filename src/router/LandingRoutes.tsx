import { ROUTE_PATHS } from "@/constants/routes";
import NotFound from "@/pages/NotFound";
import HallOfFame from "@/pages/HallOfFame";
import Leaderboard from "@/pages/Leaderboard";
import Programs from "@/pages/Programs";
import Landing from "@/pages/Landing";
import ProgramDetails from "@/pages/ProgramDetails";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import SocialMedia from "@/pages/SocialMedia";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

export const landingRoutes = [
  { path: ROUTE_PATHS.LANDING.LANDING, element: <Landing /> },
  { path: ROUTE_PATHS.LANDING.PROGRAMS, element: <Programs /> },
  { path: ROUTE_PATHS.LANDING.PROGRAM_DETAILS, element: <ProgramDetails /> },
  { path: ROUTE_PATHS.LANDING.LEADERBOARD, element: <Leaderboard /> },
  { path: ROUTE_PATHS.LANDING.HALL_OF_FAME, element: <HallOfFame /> },
  { path: ROUTE_PATHS.LANDING.ABOUT_US, element: <AboutUs /> },
  { path: ROUTE_PATHS.LANDING.CONTACT_US, element: <ContactUs /> },
  { path: ROUTE_PATHS.LANDING.SOCIAL_MEDIA, element: <SocialMedia /> },
  { path: ROUTE_PATHS.LANDING.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: ROUTE_PATHS.LANDING.TERMS_OF_SERVICE, element: <TermsOfService /> },
  { path: "*", element: <NotFound /> },
];
