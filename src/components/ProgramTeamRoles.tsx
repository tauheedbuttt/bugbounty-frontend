import React from "react";
import { getRoleIcon } from "./ProgramTriagersManagement";
import { PROGRAM_ROLES } from "@/lib/enums";

const ProgramTeamRoles = () => {
  const teamRoles = [
    {
      value: PROGRAM_ROLES.SuperAdmin,
      label: "Super Admin",
      description: "Full access to all program features and settings.",
    },
    {
      value: PROGRAM_ROLES.Triager,
      label: "Triager",
      description: "Access and manage reports only.",
    },
    {
      value: PROGRAM_ROLES.Accountant,
      label: "Accountant",
      description: "Access to analytics and payments only.",
    },
    {
      value: PROGRAM_ROLES.ViewerAdmin,
      label: "Viewer Admin",
      description: "Can view everything but cannot modify or manage content.",
    },
  ];

  function getRoleLabel(roleValue: string) {
    const found = teamRoles.find((r) => r.value === roleValue);
    return found ? found.label : roleValue;
  }
  return (
    <div>
      <h3 className="text-md font-semibold mb-2 text-foreground">Team Roles</h3>
      <ul className="grid sm:grid-cols-2 gap-3 text-sm">
        {teamRoles.map((role) => (
          <li
            key={role.value}
            className="flex items-center gap-2 bg-muted rounded px-3 py-2"
          >
            {getRoleIcon(role.value)}
            <div>
              <span className="font-medium">{role.label}:</span>
              <span className="ml-1 text-muted-foreground">
                {role.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramTeamRoles;
