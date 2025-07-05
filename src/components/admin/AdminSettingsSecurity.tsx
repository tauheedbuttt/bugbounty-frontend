
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function AdminSettingsSecurity() {
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnable = () => {
    setLoading(true);
    setTimeout(() => {
      setTwoFA(true);
      setLoading(false);
      toast({ title: "Two-Factor Authentication Enabled" });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Shield className="text-primary" />
        <div className="flex flex-col">
          <span className="font-semibold text-base">Two-Factor Authentication</span>
          <span className="text-sm text-muted-foreground">
            {twoFA
              ? "2FA is enabled for this account."
              : "Add an extra layer of security by enabling two-factor authentication."}
          </span>
        </div>
        <Switch checked={twoFA} disabled={twoFA || loading} onCheckedChange={handleEnable} />
      </div>
    </div>
  );
}
