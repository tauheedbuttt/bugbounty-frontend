import useLocalStorage from "@/hooks/use-local-storage";
import { PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface ProgramProtectedComponent extends PropsWithChildren {
  allowedRoles: PROGRAM_ROLES[];
  readonlyRoles?: PROGRAM_ROLES[];
  disabled?: boolean;
}

const ProgramProtectedComponent = ({
  children,
  allowedRoles,
  disabled,
  readonlyRoles,
}: ProgramProtectedComponent) => {
  const { role, programRole } = useLocalStorage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure store is ready
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  const isProgram = role === ROLE_TYPES.Program;
  const isReader =
    programRole === PROGRAM_ROLES.ViewerAdmin ||
    readonlyRoles?.includes(programRole);
  const isAllowed = allowedRoles.includes(programRole);
  const isComponentAllowed = isProgram && isAllowed;

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

export default ProgramProtectedComponent;
