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
import { rolesBaseAtuhPath } from "@/lib/constant";
import { useAuthStore } from "@/stores/auth";
import {
  BarChart3,
  FileText,
  CreditCard,
  Settings,
  Shield,
  Users,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const programMenuItems = [
  {
    title: "Reports",
    url: "reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "analytics",
    icon: BarChart3,
  },
  {
    title: "Payments",
    url: "payments",
    icon: CreditCard,
  },
  {
    title: "Team Management",
    url: "triagers",
    icon: Users,
  },
];

export function ProgramSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { programName } = useParams();
  const { role, logout } = useAuthStore();

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

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
                      to={`/${programName}/${item.url}`}
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
