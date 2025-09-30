import Verify2FA from "@/components/admin/Verify2FA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTE_PATHS } from "@/constants/routes";
import { useAuth } from "@/hooks/apis/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { ROLE_TYPES } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { PathMaps } from "@/types/auth";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Verify2FAPage() {
  const { t, currentLanguage } = useTranslation();
  const { type: paramsType } = useParams(); // Researcher, Program, or Admin
  const type = PathMaps[paramsType] as ROLE_TYPES;

  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const { useVerify2fa } = useAuth(type);
  const { mutate: verify2fa, isPending: isVerifying } = useVerify2fa(() =>
    setIsError(true)
  );

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

  const handleBack = () => navigate(getBackLink());
  const handleVerify = (code: string) => {
    verify2fa({ token: code, email, role: type });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t.common.buttons["2fa_verification"]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Verify2FA
            onBack={handleBack}
            onVerify={handleVerify}
            loading={isVerifying}
            hideButtons
            allowBackupCode={isError}
          />

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
