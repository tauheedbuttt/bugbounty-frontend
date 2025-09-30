import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AdminUserResponseData } from "@/types/admin/user";
import { ADMIN_ROLES } from "@/lib/enums";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@/hooks/apis/use-users";
import AdminProtectedComponent from "./AdminProtectedComponent";
import { useTranslation } from "@/hooks/use-translation";

interface Props {
  admins: AdminUserResponseData[];
  onEditPermissions: (admin: AdminUserResponseData) => void;
  isLoading: boolean;
}

export function AdminList({ admins, onEditPermissions, isLoading }: Props) {
  const { useAdminRemoveUser } = useUser();
  const { mutate: removeUser, isPending: isRemovePending } = useAdminRemoveUser;
  const { t } = useTranslation();

  const onRemove = (id: string) => {
    removeUser({ id });
  };

  if (!admins.length) {
    return (
      <p className="text-muted-foreground text-sm">
        {t.common.buttons.no_admins_found}
      </p>
    );
  }

  const columns = [
    { label: t.forms.labels.email },
    { label: t.forms.labels.role },
    { label: "" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.label}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          admins.length === 0 &&
          columns.map((item) => (
            <TableRow key={item.label}>
              {columns.map((col) => (
                <TableCell>
                  <Skeleton className={"h-[10px]"} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        {admins.map((admin) => (
          <TableRow key={admin._id}>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${
                  admin.adminRole === ADMIN_ROLES.SuperAdmin
                    ? "bg-primary text-primary-foreground"
                    : admin.adminRole === ADMIN_ROLES.Mediator
                    ? "bg-muted text-foreground"
                    : "bg-muted text-muted-foreground border border-input"
                }`}
              >
                {admin.adminRole}
              </span>
            </TableCell>
            <AdminProtectedComponent
              allowedRoles={[ADMIN_ROLES.SuperAdmin]}
              disabled
            >
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditPermissions(admin)}
                  >
                    {t.common.buttons.permissions}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black text-white border-black hover:bg-black/90"
                    onClick={() => onRemove(admin._id)}
                    disabled={isRemovePending}
                  >
                    {t.common.buttons.remove}
                  </Button>
                </div>
              </TableCell>
            </AdminProtectedComponent>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
