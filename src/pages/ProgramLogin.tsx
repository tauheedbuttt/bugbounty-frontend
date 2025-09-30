import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { ROLE_TYPES } from "@/lib/enums";
import { loginValidationSchema } from "@/validations/auth";
import { useFormik } from "formik";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/apis/use-auth";

export default function ProgramLogin() {
  const { t } = useTranslation();
  const { useLogin } = useAuth(ROLE_TYPES.Program);
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t.common.buttons.program_access}
          </CardTitle>
          <p className="text-muted-foreground">
            {t.common.buttons.sign_in_to_your_program_dashboard}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.forms.labels.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
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
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  isLoading={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/program/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t.common.buttons.forgot_password}
              </Link>
            </div>

            <Button type="submit" className="w-full">
              {t.common.buttons.access_program_dashboard}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              {t.common.buttons.need_access_contact_your_program_administrator}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
