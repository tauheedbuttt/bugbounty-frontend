
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ROLE_LABEL, ROLE_DESC, AdminRole } from "./AdminList";
import { AdminType } from "./AdminManagementSection";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  open: boolean;
  admin: AdminType;
  onClose: () => void;
  onSave: (role: AdminRole) => void;
};

const ALL_ROLES: AdminRole[] = ["super", "mediator", "reader"];

export function AdminPermissionsModal({
  open,
  admin,
  onClose,
  onSave,
}: Props) {
  const [role, setRole] = useState<AdminRole>(admin.role);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role for {admin.email}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(role);
          }}
        >
          <RadioGroup value={role} onValueChange={v => setRole(v as AdminRole)} className="mb-4 space-y-3">
            {ALL_ROLES.map(r => (
              <label
                key={r}
                className="flex items-start gap-3 cursor-pointer rounded px-3 py-2 hover:bg-accent transition"
              >
                <RadioGroupItem value={r} className="mt-1" />
                <div>
                  <span className="font-medium">{ROLE_LABEL[r]}</span>
                  <div className="text-xs text-muted-foreground">{ROLE_DESC[r]}</div>
                </div>
              </label>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
