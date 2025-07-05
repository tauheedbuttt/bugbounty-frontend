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

export function GeneralSettings() {
  const { role } = useAuthStore();
  const { useGetProfile } = useAuth(role);
  const { useUpdateProfile: useUpdateProfile } = useAuth(role);
  const { useUpdateProfile: useUpdateEmail } = useAuth(role);
  const { useUpdateProfile: useUpdatePhone } = useAuth(role);

  const { mutate: updateProfile, isPending: isUpdatePending } =
    useUpdateProfile;
  const { mutate: updateEmail, isPending: isEmailPending } = useUpdateEmail;
  const { mutate: updatePhone, isPending: isPhonePending } = useUpdatePhone;

  const { data, isFetching } = useGetProfile({});
  const profile = data?.data;

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
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-gray-200">
                <span className="text-4xl">🔧</span>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                +
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Attach files by dragging & dropping, or click to upload</p>
              <p>Maximum: 1 attachment(s), 1MB each</p>
            </div>
            <Button variant="outline">Upload Avatar</Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="phone">Mobile Number</Label>
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
                    Update
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
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter your job title"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">Select Country</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                placeholder="Tell us about yourself..."
                className="min-h-[120px]"
                value={formData.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button isLoading={isUpdatePending} type="submit">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Password Reset Section */}
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>
            <ChangePasswordDialog variant="outline" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
