import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InviteAdminForm } from "./InviteAdminForm";
import { AdminList } from "./AdminList";
import { AdminPermissionsModal } from "./AdminPermissionsModal";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/user";
import { AdminRoleData, AdminUserResponseData } from "@/types/admin/user";
import { ADMIN_ROLES } from "@/lib/enums";
import { UseMutateFunction } from "@tanstack/react-query";
import AdminProtectedComponent from "./AdminProtectedComponent";
import { useTranslation } from "@/hooks/use-translation";

export interface AdminManagementSecitionProps {
  isLoading: boolean;
  isAssignRolePending: boolean;
  assignRole: UseMutateFunction<any, Error, AdminRoleData, unknown>;
  editModal: null | {
    admin: AdminUserResponseData;
  };
  handleOpenPermissions: (admin: AdminUserResponseData) => void;
  handleClosePermissions: VoidFunction;
}

export function AdminManagementSection({
  isLoading,
  isAssignRolePending,
  assignRole,
  editModal,
  handleOpenPermissions,
  handleClosePermissions,
}: AdminManagementSecitionProps) {
  const { t } = useTranslation();
  const { users } = useUserStore();
  const admins = users as AdminUserResponseData[];

  const handleUpdatePermissions = (id: string, role: ADMIN_ROLES) => {
    assignRole({ id, role });
  };

  return (
    <section className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle>{t.common.buttons.admin_management}</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminProtectedComponent
            allowedRoles={[ADMIN_ROLES.SuperAdmin]}
            disabled
          >
            <InviteAdminForm />
          </AdminProtectedComponent>
          <div className="mt-6">
            <AdminList
              admins={admins}
              onEditPermissions={handleOpenPermissions}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
      {editModal && (
        <AdminPermissionsModal
          admin={editModal.admin}
          open={!!editModal}
          onClose={handleClosePermissions}
          onSave={(role) => handleUpdatePermissions(editModal.admin._id, role)}
          isAssignRolePending={isAssignRolePending}
        />
      )}
    </section>
  );
}
