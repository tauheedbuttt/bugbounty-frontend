import React from "react";
import { AdminUserResponseData } from "@/types/admin/user";

import { useUser } from "@/hooks/apis/use-users";
import { ROLE_TYPES } from "@/lib/enums";

import { AdminManagementSection } from "@/components/AdminManagementSection";

export default function AdminAdminManagement() {
  const [editModal, setEditModal] = React.useState<null | {
    admin: AdminUserResponseData;
  }>(null);

  const handleOpenPermissions = (admin: AdminUserResponseData) => {
    setEditModal({ admin });
  };
  const handleClosePermissions = () => setEditModal(null);

  const { useGetAdminUsers, useAdminRoleUser } = useUser();

  const { mutate: assignRole, isPending: isAssignRolePending } =
    useAdminRoleUser(handleClosePermissions);

  const { isLoading } = useGetAdminUsers({
    params: {
      page: 1,
      limit: 0,
      role: ROLE_TYPES.Admin,
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <AdminManagementSection
        isLoading={isLoading}
        isAssignRolePending={isAssignRolePending}
        assignRole={assignRole}
        editModal={editModal}
        handleOpenPermissions={handleOpenPermissions}
        handleClosePermissions={handleClosePermissions}
      />
    </div>
  );
}
