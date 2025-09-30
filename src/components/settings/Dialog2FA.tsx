import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { UpdateProfileData } from "@/types/auth";
import { useState } from "react";
import { MFAEnableSteps } from "../MFAEnableSteps";

interface SettingsProps {
  profile: UpdateProfileData;
}

export function Dialog2FA({ profile }: SettingsProps) {
  const [open, onOpenChange] = useState(false);

  return (
    <>
      <Button
        onClick={() => onOpenChange(true)}
        disabled={!!profile.is2FA}
        variant="outline"
      >
        {profile.is2FA ? "2FA Enabled" : "Enable 2FA"}
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              2FA Authentication
            </DialogTitle>
          </DialogHeader>
          <MFAEnableSteps
            fetchDefault
            onSuccessVerify={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
