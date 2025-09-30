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
import useNotification from "@/hooks/apis/use-notification";
import { useTranslation } from "@/hooks/use-translation";
import { rolesBaseAtuhPath } from "@/lib/constant";
import { useAuthStore } from "@/stores/auth";
import {
  Shield,
  BarChart3,
  Trophy,
  Users,
  FileText,
  Gift,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, role } = useAuthStore();
  const { t } = useTranslation();

  const { useGetNotificationSeen } = useNotification();

  const { data } = useGetNotificationSeen({});
  const notifications = data?.data?.notifications;

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

  const menuItems = [
    {
      title: t.common.buttons.dashboard,
      url: ROUTE_PATHS.DASHBOARD,
      icon: BarChart3,
    },
    {
      title: t.common.buttons.leaderboard,
      url: ROUTE_PATHS.HACKER_LEADERBOARD,
      icon: Trophy,
    },
    {
      title: t.common.buttons.programs,
      url: ROUTE_PATHS.HACKER_PROGRAMS,
      icon: Shield,
    },
    {
      title: t.common.buttons.reports,
      url: ROUTE_PATHS.REPORTS,
      icon: FileText,
    },
    {
      title: t.common.buttons.bounties,
      url: ROUTE_PATHS.BOUNTIES,
      icon: Gift,
    },
    {
      title: `${t.common.buttons.notifications} ${
        notifications ? `(${notifications})` : ""
      }`,
      url: ROUTE_PATHS.NOTIFICATIONS,
      icon: AlertTriangle,
    },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">BugBounty</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
