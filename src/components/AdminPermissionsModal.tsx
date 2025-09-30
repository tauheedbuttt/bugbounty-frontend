import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AdminUserResponseData } from "@/types/admin/user";
import { ADMIN_ROLES } from "@/lib/enums";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

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
  const { t, currentLanguage } = useTranslation();
  const [role, setRole] = useState<ADMIN_ROLES>(admin.adminRole);

  const ROLE_DESC = {
    [ADMIN_ROLES.SuperAdmin]: t.common.buttons.full_access_to_everything,
    [ADMIN_ROLES.Mediator]:
      t.common.buttons.assign_mediators_and_manage_programs,
    [ADMIN_ROLES.ReaderAdmin]: t.common.buttons.readonly_access_to_everything,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.common.buttons.edit_role_for} {admin.email}
          </DialogTitle>
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
                className={cn(
                  "flex items-center gap-3 cursor-pointer rounded px-3 py-2 hover:bg-accent transition",
                  currentLanguage === "ar"
                    ? "flex-row-reverse text-right"
                    : "text-left"
                )}
              >
                <RadioGroupItem value={r} className="mt-1" />
                <div
                  className={cn(
                    currentLanguage === "ar" ? "text-right" : "text-left"
                  )}
                >
                  <span className="font-medium">{r}</span>
                  <div
                    className={cn(
                      "text-xs text-muted-foreground",
                      currentLanguage === "ar" ? "text-right" : "text-left"
                    )}
                  >
                    {ROLE_DESC[r]}
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t.common.buttons.cancel}
            </Button>
            <Button
              disabled={isAssignRolePending}
              isLoading={isAssignRolePending}
              type="submit"
              variant="default"
            >
              {t.common.buttons.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
