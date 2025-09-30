import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ROUTE_PATHS } from "@/constants/routes";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { rolesBaseAtuhPath } from "@/lib/constant";
import { ADMIN_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import {
  Shield,
  BarChart3,
  Users,
  FileText,
  Settings,
  UserCheck,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const allRoles = Object.values(ADMIN_ROLES);
const readerAndSuperADmin = [ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, role, adminRole } = useAuthStore();
  const { t } = useTranslation();
  const { useGetUnseenReports } = useReport();

  const { data, isFetching } = useGetUnseenReports({});
  const reports = data?.data?.reports;
  const mediators = data?.data?.mediations;

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

  const adminMenuItems = [
    {
      title: t.common.buttons.dashboard,
      url: ROUTE_PATHS.ADMIN_DASHBOARD,
      icon: BarChart3,
      allowedRoles: readerAndSuperADmin,
    },
    {
      title: t.navigation.program_management,
      url: ROUTE_PATHS.ADMIN_PROGRAMS,
      icon: Shield,
      allowedRoles: readerAndSuperADmin,
    },
    {
      title: t.navigation.researcher_management,
      url: ROUTE_PATHS.ADMIN_RESEARCHERS,
      icon: UserCheck,
      allowedRoles: readerAndSuperADmin,
    },
    {
      title: t.common.buttons.admin_management,
      url: ROUTE_PATHS.ADMIN_ADMINS,
      icon: Users,
      allowedRoles: readerAndSuperADmin,
    },
    {
      title: `${t.common.buttons.reports} ${reports ? `(${reports})` : ""}`,
      url: ROUTE_PATHS.ADMIN_REPORTS,
      icon: FileText,
      allowedRoles: allRoles.filter((item) => item !== ADMIN_ROLES.Mediator),
    },
    {
      title: `${t.common.buttons.mediation} ${
        mediators ? `(${mediators})` : ""
      }`,
      url: ROUTE_PATHS.ADMIN_MEDIATOR,
      icon: FileText,
      allowedRoles: allRoles,
    },
    // {
    //   title: t.common.buttons.notifications,
    //   url: ROUTE_PATHS.NOTIFICATIONS,
    //   icon: AlertTriangle,
    // },
  ].filter((item) => item.allowedRoles.includes(adminRole as any));

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            {t.navigation.admin_portal}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border mt-auto p-4">
        <button
          className="flex items-center gap-3 w-full text-sm hover:bg-accent rounded-md px-3 py-2 transition-colors text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
