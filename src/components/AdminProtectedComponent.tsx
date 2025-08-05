import useLocalStorage from "@/hooks/use-local-storage";
import { ADMIN_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface AdminProtectedComponent extends PropsWithChildren {
  allowedRoles: ADMIN_ROLES[];
  disabled?: boolean;
}

const AdminProtectedComponent = ({
  children,
  allowedRoles,
  disabled,
}: AdminProtectedComponent) => {
  const { role, adminRole } = useLocalStorage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure store is ready
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  const isAdmin = role === ROLE_TYPES.Admin;
  const isReader = adminRole === ADMIN_ROLES.ReaderAdmin;
  const isAllowed = allowedRoles.includes(adminRole);
  const isComponentAllowed = isAdmin && isAllowed;
  const isHacker = role === ROLE_TYPES.Hacker;

  if (isHacker) return children;

  if (!isComponentAllowed) return null;

  if (disabled && isReader) {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          disabled: true,
          onClick: undefined,
        } as any);
      }
      return child;
    });
  }

  return children;
};

export default AdminProtectedComponent;
