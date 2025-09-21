import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { LandingLayout } from "@/layouts/LandingLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useRouteConfig } from "@/hooks/use-route-config";

export const AppRouter = () => {
  const routeConfig = useRouteConfig();
  const { layoutType } = routeConfig;

  const renderLayout = () => {
    switch (layoutType) {
      case "landing":
        return <LandingLayout />;
      case "auth":
        return <AuthLayout />;
      case "dashboard":
        return <DashboardLayout />;
      default:
        return (
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
    }
  };

  return renderLayout();
};
