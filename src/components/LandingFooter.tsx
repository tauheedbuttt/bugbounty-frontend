import { ROUTE_PATHS } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Outer rectangle with #1C1C1C */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          {/* Inner rectangle with #525252 */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: "#525252",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {/* Platform Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h4 className="font-light text-white text-lg">
                    {t.forms.labels.platform}
                  </h4>
                </div>
                <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                  <Link
                    to={ROUTE_PATHS.LANDING.PROGRAMS}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.bug_bounty_programs}
                  </Link>
                  <Link
                    to={ROUTE_PATHS.LANDING.LEADERBOARD}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.leaderboard}
                  </Link>
                  <Link
                    to={ROUTE_PATHS.LANDING.HALL_OF_FAME}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.hall_of_fame}
                  </Link>
                </div>
              </div>

              {/* Operations Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <h4 className="font-light text-white text-lg">
                    {t.common.buttons.contact}
                  </h4>
                </div>
                <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                  <Link
                    to={ROUTE_PATHS.LANDING.CONTACT_US}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.contact_us}
                  </Link>
                  <Link
                    to={ROUTE_PATHS.LANDING.SOCIAL_MEDIA}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.social_media}
                  </Link>
                  <Link
                    to="https://medium.com/@bugbountysy"
                    target="_blank"
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.blog}
                  </Link>
                </div>
              </div>

              {/* Company & Support Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="font-light text-white text-lg">
                    {t.common.buttons.legal}
                  </h4>
                </div>
                <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                  <Link
                    to={ROUTE_PATHS.LANDING.ABOUT_US}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.about_us}
                  </Link>
                  <Link
                    to={ROUTE_PATHS.LANDING.PRIVACY_POLICY}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.privacy_policy}
                  </Link>
                  <Link
                    to={ROUTE_PATHS.LANDING.TERMS_OF_SERVICE}
                    className="block hover:text-white cursor-pointer"
                  >
                    {t.common.buttons.terms_of_service}
                  </Link>
                </div>
              </div>
            </div>

            {/* Logo and Company Info */}
            <div className="border-t border-gray-600 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <img
                    src="/lovable-uploads/dd13495d-882c-427e-b730-432eff1e26aa.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xl font-light text-white">
                    {t.common.buttons.bugbounty_seria}
                  </span>
                </div>
                <p className="text-sm font-light text-gray-400 max-w-md">
                  {t.common.buttons.leading_platform_security}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-6 font-light">
          {t.common.buttons["2024_bugbounty_platform_all_rights"]}
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
