import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import ChangePasswordDialog from "../settings/ChangePasswordDialog";

import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/hooks/apis/use-auth";
import { useFormik } from "formik";
import { UpdateProfileData } from "@/types/auth";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import AvatarUpload from "../settings/AvatarUpload";

interface AdminSettingsGeneralProps {
  isProfileLoading: boolean;
  profile: UpdateProfileData;
}

export function AdminSettingsGeneral({
  isProfileLoading: loading,
  profile,
}: AdminSettingsGeneralProps) {
  const { t, currentLanguage } = useTranslation();
  const { role } = useAuthStore();
  const { useUpdateProfile: useUpdateEmail } = useAuth(role);
  const { useUpdateProfile: useUpdateUsername } = useAuth(role);

  const { mutate: updateEmail, isPending: isEmailPending } = useUpdateEmail;
  const { mutate: updateUsername, isPending: isUsernamePending } =
    useUpdateUsername;

  const { values, setValues } = useFormik({
    initialValues: {
      username: profile?.username ?? "",
      email: profile?.email ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const email = values.email;
  const setEmail = (email: string) => setValues({ ...values, email });
  const username = values.username;
  const setUsername = (username: string) => setValues({ ...values, username });

  // For simplicity, password is not displayed but can be reset.
  const handleSave = (field: "email" | "username") => {
    const actions = {
      email: updateEmail,
      username: updateUsername,
    };
    const action = actions[field];
    action({ [field]: values[field] });
  };

  return (
    <div className="space-y-5">
      <AvatarUpload isFetching={loading} profile={profile} />
      <div>
        <label className="block mb-1 text-sm font-medium">
          {t.forms.labels.email}
        </label>
        <div
          className={cn(
            "flex gap-2",
            currentLanguage === "ar" ? "flex-row-reverse" : ""
          )}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => handleSave("email")}
            disabled={loading || isEmailPending}
          >
            {t.common.buttons.update}
          </Button>
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">
          {t.forms.labels.username}
        </label>
        <div
          className={cn(
            "flex gap-2",
            currentLanguage === "ar" ? "flex-row-reverse" : ""
          )}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => handleSave("username")}
            disabled={loading || isUsernamePending}
          >
            {t.common.buttons.update}
          </Button>
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">
          {t.forms.labels.password}
        </label>
        <div className="flex gap-2">
          <ChangePasswordDialog hasPassword={profile?.hasPassword} />
        </div>
      </div>
    </div>
  );
}
