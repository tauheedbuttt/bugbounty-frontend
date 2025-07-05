import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings as SettingsIcon, User, LogOut, UserIcon } from "lucide-react";
import { Settings } from "./Settings";
import { useAuthStore } from "@/stores/auth";
import { rolesBaseAtuhPath } from "@/lib/constant";
import { ROLE_TYPES } from "@/lib/enums";
import { ROUTE_PATHS } from "@/constants/routes";

// Simulate admin check (replace later with real logic)
function useIsAdmin() {
  const { role } = useAuthStore();
  return role === ROLE_TYPES.Admin;
}

export function ProfileDropdown() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, role } = useAuthStore();
  const isAdmin = useIsAdmin();

  const handleSettingsClick = () => {
    if (isAdmin) {
      setSettingsOpen(true);
    } else {
      navigate(ROUTE_PATHS.SETTINGS);
    }
  };

  function handleLogout() {
    logout();
    navigate(rolesBaseAtuhPath[role]);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to={ROUTE_PATHS.PROFILE}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick}>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isAdmin && (
        <Settings open={settingsOpen} onOpenChange={setSettingsOpen} />
      )}
    </>
  );
}
