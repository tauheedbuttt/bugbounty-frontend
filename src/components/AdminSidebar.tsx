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
import { rolesBaseAtuhPath } from "@/lib/constant";
import { useAuthStore } from "@/stores/auth";
import {
  Shield,
  BarChart3,
  Users,
  FileText,
  Settings,
  UserCheck,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const adminMenuItems = [
  {
    title: "Dashboard",
    url: ROUTE_PATHS.ADMIN_DASHBOARD,
    icon: BarChart3,
  },
  {
    title: "Program Management",
    url: ROUTE_PATHS.ADMIN_PROGRAMS,
    icon: Shield,
  },
  {
    title: "Researcher Management",
    url: ROUTE_PATHS.ADMIN_RESEARCHERS,
    icon: UserCheck,
  },
  {
    title: "Admin Management",
    url: ROUTE_PATHS.ADMIN_ADMINS,
    icon: Users,
  },
  {
    title: "Reports",
    url: ROUTE_PATHS.ADMIN_REPORTS,
    icon: FileText,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, role } = useAuthStore();

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Admin Portal
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
