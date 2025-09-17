import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/hooks/apis/use-auth";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { Dialog2FA } from "./Dialog2FA";
import { UpdateProfileData } from "@/types/auth";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import AvatarUpload from "./AvatarUpload";
import { countries } from "@/constants/constants";
interface GeneralSettingsProps {
  profile: UpdateProfileData;
  isFetching: boolean;
}

export function GeneralSettings({ profile, isFetching }: GeneralSettingsProps) {
  const { t, currentLanguage } = useTranslation();
  const { role } = useAuthStore();
  const { useUpdateProfile: useUpdateProfile } = useAuth(role);
  const { useUpdateProfile: useUpdateEmail } = useAuth(role);
  const { useUpdateProfile: useUpdatePhone } = useAuth(role);

  const { mutate: updateProfile, isPending: isUpdatePending } =
    useUpdateProfile;
  const { mutate: updateEmail, isPending: isEmailPending } = useUpdateEmail;
  const { mutate: updatePhone, isPending: isPhonePending } = useUpdatePhone;

  const {
    values: formData,
    setValues: setFormData,
    handleSubmit: handleSave,
  } = useFormik({
    initialValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      username: profile?.username ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
      jobTitle: profile?.jobTitle ?? "",
      country: profile?.country ?? "",
      biography: profile?.biography ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProfile(values);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUpdateEmail = () => {
    updateEmail({ email: formData.email });
  };

  const handleUpdateMobile = () => {
    updatePhone({ phone: formData.phone });
  };

  return isFetching ? (
    <div className="flex items-center justify-center w-full h-[65vh]">
      <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
    </div>
  ) : (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar Section */}
        <AvatarUpload isFetching={isFetching} profile={profile} />

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t.common.buttons.contact}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="email">{t.forms.labels.email}</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    isLoading={isEmailPending}
                    variant="outline"
                    onClick={handleUpdateEmail}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="phone">{t.forms.labels.mobile_number}</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    isLoading={isPhonePending}
                    variant="outline"
                    onClick={handleUpdateMobile}
                  >
                    {t.common.buttons.update}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Basic Details */}
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>{t.common.buttons.basic_details}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">{t.forms.labels.first_name}</Label>
                <Input
                  id="firstName"
                  placeholder={t.common.buttons.enter_first_name}
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t.forms.labels.last_name}</Label>
                <Input
                  id="lastName"
                  placeholder={t.common.buttons.enter_last_name}
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="username">{t.forms.labels.username}</Label>
                <Input
                  id="username"
                  placeholder={t.common.buttons.enter_username}
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">{t.forms.labels.job_title}</Label>
                <Input
                  id="jobTitle"
                  placeholder={t.common.buttons.enter_job_title}
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="country">{t.forms.labels.country}</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">
                    {t.common.buttons.select_country}
                  </SelectItem>
                  {countries.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <Label htmlFor="biography">{t.forms.labels.biography}</Label>
              <Textarea
                id="biography"
                placeholder={t.common.buttons.tell_us_about_yourself}
                className="min-h-[120px]"
                value={formData.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button isLoading={isUpdatePending} type="submit">
                {t.common.buttons.save_changes}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Password Reset Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t.common.buttons.password_security}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={cn(
              "flex items-center justify-between p-4 border rounded-lg",
              currentLanguage === "ar" ? "flex-row-reverse" : ""
            )}
          >
            <div>
              <h3 className="font-semibold">
                {t.common.buttons.change_password}
              </h3>
              <p className="text-sm text-muted-foreground">
                {
                  t.common.buttons
                    .update_your_password_to_keep_your_account_secure
                }
              </p>
            </div>
            <ChangePasswordDialog
              hasPassword={profile?.hasPassword}
              variant="outline"
            />
          </div>

          <div
            className={cn(
              "flex items-center justify-between p-4 border rounded-lg",
              currentLanguage === "ar" ? "flex-row-reverse" : ""
            )}
          >
            <div>
              <h3 className="font-semibold">
                {t.common.buttons.twofactor_authentication}
              </h3>
              <p className="text-sm text-muted-foreground">
                {
                  t.common.buttons
                    .add_an_extra_layer_of_security_to_your_account
                }
              </p>
            </div>
            <Dialog2FA profile={profile} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
