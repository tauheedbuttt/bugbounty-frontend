import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/apis/use-auth";
import { ROLE_TYPES } from "@/lib/enums";
import { useFormik } from "formik";
import {
  passwordChangeForgotValidationSchema,
  passwordChangeValidationSchema,
} from "@/validations/auth";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const { type } = useParams(); // hacker, program, or admin

  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  const { useChangePassword } = useAuth(type as ROLE_TYPES);
  const { mutate: changePassword, isPending: isPasswordPending } =
    useChangePassword(() => {
      setIsSubmitted(true);
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, setValues, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
      resetPasswordToken,
    },
    validationSchema: passwordChangeForgotValidationSchema,
    onSubmit: (values) => {
      changePassword(values);
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getTitle = () => {
    switch (type) {
      case ROLE_TYPES.Hacker:
        return "Reset Hacker Password";
      case ROLE_TYPES.Program:
        return "Reset Program Password";
      case ROLE_TYPES.Admin:
        return "Reset Admin Password";
      default:
        return "Reset Password";
    }
  };

  const getBackLink = () => {
    switch (type) {
      case ROLE_TYPES.Hacker:
        return "/hacker/login";
      case ROLE_TYPES.Program:
        return "/program/login";
      case ROLE_TYPES.Admin:
        return "/admin/login";
      default:
        return "/";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              Password Updated Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Your password has been successfully updated.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can now log in with your new password.
                </p>
              </div>
            </div>
            <Link to={getBackLink()}>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Continue to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
          <p className="text-muted-foreground">
            Choose a new password to update your account security.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="text-center">
            <Link
              to={getBackLink()}
              className="text-sm text-primary hover:underline flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
