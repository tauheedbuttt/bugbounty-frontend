
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AdminType } from "./AdminManagementSection";

export type AdminRole = "super" | "mediator" | "reader";
export const ROLE_LABEL: Record<AdminRole, string> = {
  super: "Super Admin",
  mediator: "Mediator",
  reader: "Reader Admin"
};
export const ROLE_DESC: Record<AdminRole, string> = {
  super: "Full access to everything.",
  mediator: "Assign mediators and manage programs.",
  reader: "Read-only access to everything."
};

export type AdminForList = AdminType;

interface Props {
  admins: AdminForList[];
  onRemove: (id: string) => void;
  onEditPermissions: (admin: AdminForList) => void;
}

export function AdminList({ admins, onRemove, onEditPermissions }: Props) {
  if (!admins.length) {
    return <p className="text-muted-foreground text-sm">No admins found.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map(admin => (
          <TableRow key={admin.id}>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  admin.role === "super"
                    ? "bg-primary text-primary-foreground"
                    : admin.role === "mediator"
                    ? "bg-muted text-foreground"
                    : "bg-muted text-muted-foreground border border-input"
                }`}
              >
                {ROLE_LABEL[admin.role]}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onEditPermissions(admin)}>
                  Permissions
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-black text-white border-black hover:bg-black/90"
                  onClick={() => onRemove(admin.id)}
                >
                  Remove
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
