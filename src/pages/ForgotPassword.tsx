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
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const { t, currentLanguage } = useTranslation();
  const location = useLocation();
  const type = location.pathname
    .replace("/forgot-password", "")
    .replace("/", "");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getRole = () => {
    switch (type) {
      case "researcher":
        return ROLE_TYPES.Hacker;
      case "program":
        return ROLE_TYPES.Program;
      case "admin":
        return ROLE_TYPES.Admin;
    }
  };

  const { useForgotPassword } = useAuth(getRole());
  const { mutate: forgotPassword, isPending } = useForgotPassword(() => {
    setIsSubmitted(true);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword({ email });
  };
  console.log({ type });

  const getTitle = () => {
    switch (type) {
      case "researcher":
        return t.common.buttons.reset_hacker_password;
      case "program":
        return t.common.buttons.reset_program_password;
      case "admin":
        return t.common.buttons.reset_admin_password;
      default:
        return t.common.buttons.reset_password;
    }
  };

  const getBackLink = () => {
    switch (type) {
      case "researcher":
        return ROUTE_PATHS.HACKER_LOGIN;
      case "program":
        return ROUTE_PATHS.PROGRAM_LOGIN;
      case "admin":
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
              {t.common.buttons.check_your_email}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <Mail className="h-16 w-16 text-green-600 mx-auto" />
              <p className="text-muted-foreground">
                {t.common.buttons.weve_sent_a_password_reset_link}
                {": "}
                <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                {t.common.buttons.reset_password_check_email}
              </p>
            </div>
            <Link to={getBackLink()}>
              <Button
                variant="outline"
                className={cn(
                  "w-full",
                  currentLanguage === "ar" ? "flex-row-reverse " : ""
                )}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
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
            {t.common.buttons.reset_password_instructions}
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
                  placeholder={t.common.buttons.enter_your_email_address}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button isLoading={isPending} type="submit" className="w-full">
              {t.common.buttons.send_reset_link}
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
