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
import useLocalStorage from "@/hooks/use-local-storage";
import { useTranslation } from "@/hooks/use-translation";
import { rolesBaseAtuhPath } from "@/lib/constant";
import { PROGRAM_ROLES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import {
  BarChart3,
  FileText,
  CreditCard,
  Shield,
  Users,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function ProgramSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, programName, logout } = useAuthStore();
  const { t } = useTranslation();
  const programRole = useAuthStore((state) => state.programRole);

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

  const programMenuItems = [
    {
      title: t.common.buttons.reports,
      url: "reports",
      icon: FileText,
      allowedRoles: [
        PROGRAM_ROLES.SuperAdmin,
        PROGRAM_ROLES.ViewerAdmin,
        PROGRAM_ROLES.Triager,
      ],
    },
    {
      title: t.navigation.analytics,
      url: "analytics",
      icon: BarChart3,
      allowedRoles: [
        PROGRAM_ROLES.SuperAdmin,
        PROGRAM_ROLES.ViewerAdmin,
        PROGRAM_ROLES.Triager,
      ],
    },
    {
      title: t.navigation.payments,
      url: "payments",
      icon: CreditCard,
      allowedRoles: [
        PROGRAM_ROLES.SuperAdmin,
        PROGRAM_ROLES.ViewerAdmin,
        PROGRAM_ROLES.Accountant,
      ],
    },
    {
      title: t.navigation.team_management,
      url: "triagers",
      icon: Users,
      allowedRoles: [PROGRAM_ROLES.SuperAdmin, PROGRAM_ROLES.ViewerAdmin],
    },
  ].filter((item) => item.allowedRoles.includes(programRole));

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <span className="text-xl font-bold text-foreground">
              {programName}
            </span>
            <p className="text-sm text-muted-foreground">Program Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {programMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.endsWith(`/${item.url}`)}
                    className="hover:bg-accent transition-colors"
                  >
                    <Link
                      to={`/program/${item.url}`}
                      className="flex items-center gap-3"
                    >
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
      <SidebarFooter className="mt-auto border-t border-border p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
