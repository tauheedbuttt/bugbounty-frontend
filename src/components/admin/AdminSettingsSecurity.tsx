import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { UpdateProfileData } from "@/types/auth";
import "./settings.css";
import { MFAEnableSteps, MFAEnableStepsRef } from "../MFAEnableSteps";

interface AdminSettingsSecurityProps {
  profile: UpdateProfileData;
}

export function AdminSettingsSecurity({ profile }: AdminSettingsSecurityProps) {
  const mfaRef = useRef<MFAEnableStepsRef>(null);
  const [twoFA, setTwoFA] = useState(!!profile?.is2FA);

  const loading = mfaRef.current?.loading;
  const handleEnable = () => {
    setTwoFA(true);
    mfaRef.current?.handleEnable();
  };

  useEffect(() => {
    setTwoFA(!!profile?.is2FA);
  }, [profile]);

  return (
    <div
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      className="space-y-6 overflow-auto scrollbar-hide"
    >
      <div className="flex items-center gap-4">
        <Shield className="text-primary" />
        <div className="flex flex-col">
          <span className="font-semibold text-base">
            Two-Factor Authentication
          </span>
          <span className="text-sm text-muted-foreground">
            {twoFA
              ? "2FA is enabled for this account."
              : "Add an extra layer of security by enabling two-factor authentication."}
          </span>
        </div>
        <Switch
          checked={twoFA}
          disabled={twoFA || loading}
          onCheckedChange={handleEnable}
        />
      </div>

      <MFAEnableSteps ref={mfaRef} onSuccess={() => setTwoFA(true)} />
    </div>
  );
}
