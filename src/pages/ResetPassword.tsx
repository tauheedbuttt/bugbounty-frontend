import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTE_PATHS } from "@/constants/routes";
import { useAuth } from "@/hooks/apis/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { ROLE_TYPES } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { PathMaps } from "@/types/auth";
import { passwordChangeForgotValidationSchema } from "@/validations/auth";
import { useFormik } from "formik";
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function ForgotPassword() {
  const { t, currentLanguage } = useTranslation();
  const { type: paramsType } = useParams(); // Researcher, Program, or Admin
  const type = PathMaps[paramsType] as ROLE_TYPES;

  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  const { useChangePassword } = useAuth(type);
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
    validationSchema: passwordChangeForgotValidationSchema(t),
    onSubmit: (values) => {
      changePassword(values);
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getTitle = () => {
    switch (type) {
      case ROLE_TYPES.Hacker:
        return "Reset Researcher Password";
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
        return ROUTE_PATHS.HACKER_LOGIN;
      case ROLE_TYPES.Program:
        return ROUTE_PATHS.PROGRAM_LOGIN;
      case ROLE_TYPES.Admin:
        return ROUTE_PATHS.ADMIN_LOGIN;
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
              {t.common.buttons.password_updated_successfully}
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
                  {t.common.buttons.your_password_has_been_successfully_updated}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.common.buttons.you_can_now_log_in_with_your_new_password}
                </p>
              </div>
            </div>
            <Link to={getBackLink()}>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t.common.buttons.back_to_login}
              </Button>
            </Link>
            {/* toggle */}
            <div className="flex items-center justify-center">
              <LanguageToggle className="w-fit" />
            </div>
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
            {
              t.common.buttons
                .choose_a_new_password_to_update_your_account_security
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passowrd */}
            <div className="space-y-2">
              <Label htmlFor="password">{t.forms.labels.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.common.buttons.create_password}
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
              <Label htmlFor="confirmPassword">
                {t.common.buttons.confirm_password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t.common.buttons.confirm_password}
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
              {t.common.buttons.change}
            </Button>
          </form>

          <div className="text-center">
            <Link
              to={getBackLink()}
              className={cn(
                "text-sm text-primary hover:underline flex items-center justify-center gap-2",
                currentLanguage === "ar" ? "flex-row-reverse " : ""
              )}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t.common.buttons.back_to_login}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
