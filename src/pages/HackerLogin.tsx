import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROUTE_PATHS } from "@/constants/routes";
import { useGoogle } from "@/hooks/apis/use-google";
import { useTranslation } from "@/hooks/use-translation";
import { ROLE_TYPES } from "@/lib/enums";
import { loginValidationSchema } from "@/validations/auth";
import { useFormik } from "formik";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/apis/use-auth";

export default function HackerLogin() {
  const { t } = useTranslation();
  const { googleLogin, isPending: isGooglePending } = useGoogle();
  const { useLogin } = useAuth(ROLE_TYPES.Hacker);
  const { mutate: handleLogin, isPending } = useLogin;
  const { values, errors, touched, setValues, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema(t),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => googleLogin();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t.common.buttons.hacker_login}
          </CardTitle>
          <p className="text-muted-foreground">
            {t.common.buttons.sign_in_to_your_hacker_account}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
            disabled={isGooglePending}
            isLoading={isGooglePending}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.common.buttons.continue_with_google}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t.common.buttons.or_continue_with}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.forms.labels.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  // type="email"
                  placeholder={t.forms.placeholders.enter_your_email}
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="pl-10"
                  required
                  error={
                    errors.email && touched.email ? errors.email : undefined
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.forms.labels.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.forms.placeholders.enter_your_password}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="pl-10 pr-10"
                  required
                  error={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-3 h-4  px-3 py-2 hover:bg-transparent"
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

            <div className="flex items-center justify-between">
              <Link
                to={ROUTE_PATHS.HACKER_FORGOT_PASSWORD}
                className="text-sm text-primary hover:underline"
              >
                {t.common.buttons.forgot_password}
              </Link>
            </div>

            <Button isLoading={isPending} type="submit" className="w-full">
              {t.common.buttons.sign_in}
            </Button>
          </form>

          {/* Signup */}
          <div className="text-center text-sm">
            {t.common.buttons.dont_have_account}{" "}
            <Link
              to={ROUTE_PATHS.HACKER_SIGNUP}
              className="text-primary hover:underline"
            >
              {t.common.buttons.sign_up}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
