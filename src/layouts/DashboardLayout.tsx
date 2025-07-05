import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { AppSidebar } from "@/components/AppSidebar";
import { ProgramSidebar } from "@/components/ProgramSidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useRouteConfig } from "@/hooks/use-route-config";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { adminRoutes } from "@/router/AdminRoutes";
import { hackerRoutes } from "@/router/HackerRoutes";
import { programRoutes } from "@/router/ProgramRoutes";
import ResetPassword from "@/pages/ResetPassword";

export const DashboardLayout = () => {
  const { sidebarType } = useRouteConfig();
  const routes = [...adminRoutes, ...hackerRoutes, ...programRoutes];

  const renderSidebar = () => {
    switch (sidebarType) {
      case "admin":
        return <AdminSidebar />;
      case "program":
        return <ProgramSidebar />;
      default:
        return <AppSidebar />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {renderSidebar()}
        <main className="flex-1 overflow-auto">
          <div className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between">
            <SidebarTrigger />
            <ProfileDropdown />
          </div>

          <Routes>
            <Route path="/reset" element={<ResetPassword />} />
            {routes.map(({ path, element, allowedRoles }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute
                    allowedRoles={allowedRoles}
                    requireAuth={true}
                  >
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};
