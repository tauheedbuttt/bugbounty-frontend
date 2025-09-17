import React from "react";
import { getRoleIcon } from "./ProgramTriagersManagement";
import { PROGRAM_ROLES } from "@/lib/enums";
import { useTranslation } from "@/hooks/use-translation";

const ProgramTeamRoles = () => {
  const { t } = useTranslation();
  const teamRoles = [
    {
      value: PROGRAM_ROLES.SuperAdmin,
      label: "Super Admin",
      description: t.forms.labels.full_access_to_all_program_features,
    },
    {
      value: PROGRAM_ROLES.Triager,
      label: "Triager",
      description: t.forms.labels.access_and_manage_reports_only,
    },
    {
      value: PROGRAM_ROLES.Accountant,
      label: "Accountant",
      description: t.forms.labels.access_to_analytics_and_payments_only,
    },
    {
      value: PROGRAM_ROLES.ViewerAdmin,
      label: "Viewer Admin",
      description: t.forms.labels.view_only_permission_description,
    },
  ];

  return (
    <div>
      <h3 className="text-md font-semibold mb-2 text-foreground">
        {t.common.buttons.team_roles}
      </h3>
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
