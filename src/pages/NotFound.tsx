import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { adminRolesBasePath, rolesBasePath } from "@/lib/constant";
import useLocalStorage from "@/hooks/use-local-storage";
import { getBasePath } from "@/hooks/use-base-path";
import { useTranslation } from "@/hooks/use-translation";
import { LanguageToggle } from "@/components/LanguageToggle";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { role, adminRole, programRole } = useLocalStorage();
  const path = getBasePath(role, adminRole, programRole);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          {t.common.buttons.oops_page_not_found}
        </p>
        <Link to={path} className="text-blue-500 hover:text-blue-700 underline">
          {t.common.buttons.return_to_home}
        </Link>

        {/* toggle */}
        <div className="flex items-center justify-center">
          <LanguageToggle className="w-fit" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
