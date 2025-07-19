import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ROLE_DESC } from "./AdminList";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AdminUserResponseData } from "@/types/admin/user";
import { ADMIN_ROLES } from "@/lib/enums";

type Props = {
  open: boolean;
  admin: AdminUserResponseData;
  onClose: () => void;
  onSave: (role: ADMIN_ROLES) => void;
  isAssignRolePending: boolean;
};

const ALL_ROLES: ADMIN_ROLES[] = Object.values(ADMIN_ROLES);

export function AdminPermissionsModal({
  open,
  isAssignRolePending,
  admin,
  onClose,
  onSave,
}: Props) {
  const [role, setRole] = useState<ADMIN_ROLES>(admin.adminRole);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role for {admin.email}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(role);
          }}
        >
          <RadioGroup
            value={role}
            onValueChange={(v) => setRole(v as ADMIN_ROLES)}
            className="mb-4 space-y-3"
          >
            {ALL_ROLES.map((r) => (
              <label
                key={r}
                className="flex items-start gap-3 cursor-pointer rounded px-3 py-2 hover:bg-accent transition"
              >
                <RadioGroupItem value={r} className="mt-1" />
                <div>
                  <span className="font-medium">{r}</span>
                  <div className="text-xs text-muted-foreground">
                    {ROLE_DESC[r]}
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isAssignRolePending}
              isLoading={isAssignRolePending}
              type="submit"
              variant="default"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
