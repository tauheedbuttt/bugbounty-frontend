import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Link, useLocation } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";

const LandingNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Helper function to determine if a path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Helper function to get navigation link classes
  const getNavLinkClasses = (path) => {
    const baseClasses = "transition-colors text-sm relative";
    const activeClasses = "text-white font-medium";
    const inactiveClasses = "text-gray-300 hover:text-white";

    return `${baseClasses} ${
      isActivePath(path) ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <nav
      className="border-b border-gray-800"
      style={{
        backgroundColor: "#1C1C1C",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link
            to={ROUTE_PATHS.LANDING.LANDING}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <img
              src="/lovable-uploads/dd13495d-882c-427e-b730-432eff1e26aa.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="text-lg sm:text-xl font-light text-white">
              BugBounty
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to={ROUTE_PATHS.LANDING.PROGRAMS}
              className={getNavLinkClasses(ROUTE_PATHS.LANDING.PROGRAMS)}
            >
              {t.common.buttons.bug_bounty_programs}
              {isActivePath(ROUTE_PATHS.LANDING.PROGRAMS) && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </Link>
            <Link
              to={ROUTE_PATHS.LANDING.LEADERBOARD}
              className={getNavLinkClasses(ROUTE_PATHS.LANDING.LEADERBOARD)}
            >
              {t.common.buttons.leaderboard}
              {isActivePath(ROUTE_PATHS.LANDING.LEADERBOARD) && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </Link>
            <Link
              to={ROUTE_PATHS.LANDING.HALL_OF_FAME}
              className={getNavLinkClasses(ROUTE_PATHS.LANDING.HALL_OF_FAME)}
            >
              {t.common.buttons.hall_of_fame}
              {isActivePath(ROUTE_PATHS.LANDING.HALL_OF_FAME) && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </Link>
            <a
              href="/blog"
              className={`transition-colors text-sm relative ${
                location.pathname === "/blog"
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {t.common.buttons.contact}
              {location.pathname === "/blog" && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageToggle />
          <Link
            to={ROUTE_PATHS.HACKER_LOGIN}
            className={`text-sm px-2 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              isActivePath(ROUTE_PATHS.HACKER_LOGIN)
                ? "text-white font-medium"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {t.common.buttons.login}
          </Link>
          <Link to={ROUTE_PATHS.HACKER_SIGNUP}>
            <Button
              className={`text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors ${
                isActivePath(ROUTE_PATHS.HACKER_SIGNUP)
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {t.common.buttons.sign_up}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
