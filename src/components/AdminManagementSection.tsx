import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InviteAdminForm } from "./InviteAdminForm";
import { AdminList, AdminForList, AdminRole } from "./AdminList";
import { AdminPermissionsModal } from "./AdminPermissionsModal";
import { toast } from "@/hooks/use-toast";

// Roles definition
export type AdminType = {
  email: string;
  id: string;
  role: AdminRole;
};

export function AdminManagementSection() {
  const [admins, setAdmins] = React.useState<AdminType[]>([
    {
      id: "1",
      email: "alice@yourcompany.com",
      role: "super",
    },
    {
      id: "2",
      email: "bob@yourcompany.com",
      role: "mediator",
    },
  ]);
  const [editModal, setEditModal] = React.useState<null | {admin: AdminType}>(null);

  const handleInvite = (email: string, role: AdminRole) => {
    // check if already exists
    if (admins.some(a => a.email.toLowerCase() === email.trim().toLowerCase())) {
      toast({ title: "Error", description: "Admin with this email already exists", variant: "destructive" });
      return;
    }
    const newAdmin: AdminType = {
      email,
      id: Date.now().toString(),
      role,
    };
    setAdmins(prev => [...prev, newAdmin]);
    toast({ title: "Success", description: `Invited admin: ${email} (${role})` });
  };

  const handleRemove = (id: string) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    toast({ title: "Removed", description: "Admin removed" });
  };

  const handleOpenPermissions = (admin: AdminType) => {
    setEditModal({ admin });
  };
  const handleClosePermissions = () => setEditModal(null);

  const handleUpdatePermissions = (id: string, role: AdminRole) => {
    setAdmins(prev =>
      prev.map(a =>
        a.id === id ? { ...a, role } : a
      )
    );
    toast({ title: "Updated", description: "Permissions updated" });
    handleClosePermissions();
  };

  return (
    <section className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteAdminForm onInvite={handleInvite} />
          <div className="mt-6">
            <AdminList
              admins={admins}
              onRemove={handleRemove}
              onEditPermissions={handleOpenPermissions}
            />
          </div>
        </CardContent>
      </Card>
      {editModal && (
        <AdminPermissionsModal
          admin={editModal.admin}
          open={!!editModal}
          onClose={handleClosePermissions}
          onSave={(role) =>
            handleUpdatePermissions(editModal.admin.id, role)
          }
        />
      )}
    </section>
  );
}
