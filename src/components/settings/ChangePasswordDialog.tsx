import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { passwordChangeValidationSchema } from "@/validations/auth";
import { ROLE_TYPES } from "@/lib/enums";
import { useAuth } from "@/hooks/apis/use-auth";

const ChangePasswordDialog = ({
  variant,
  className,
}: {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) => {
  const { useChangePassword } = useAuth(ROLE_TYPES.Hacker);

  const { mutate: changePassword, isPending: isPasswordPending } =
    useChangePassword(() => {
      console.log("Close");
    });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, setValues, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: passwordChangeValidationSchema,
    onSubmit: (values) => {
      changePassword(values);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Passowrd */}
          <div className="space-y-2">
            <Label htmlFor="password">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="old_password"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                value={values.old_password}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    old_password: e.target.value,
                  }))
                }
                className="pl-10 pr-10"
                required
                error={
                  touched.old_password && errors.old_password
                    ? errors.old_password
                    : undefined
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-3 h-4 px-3 py-2 hover:bg-transparent"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          {/* Passowrd */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={values.new_password}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }))
                }
                className="pl-10 pr-10"
                required
                error={
                  touched.new_password && errors.new_password
                    ? errors.new_password
                    : undefined
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-3 h-4 px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Confirm */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={values.confirm_password}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    confirm_password: e.target.value,
                  }))
                }
                className="pl-10 pr-10"
                required
                error={
                  touched.confirm_password && errors.confirm_password
                    ? errors.confirm_password
                    : undefined
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-3 h-4 px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isPasswordPending}
            disabled={isPasswordPending}
          >
            Change
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
