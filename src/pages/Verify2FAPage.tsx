import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "@/hooks/apis/use-auth";
import { ROLE_TYPES } from "@/lib/enums";
import Verify2FA from "@/components/admin/Verify2FA";
import { useState } from "react";

export default function Verify2FAPage() {
  const { type } = useParams(); // hacker, program, or admin

  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const { useVerify2fa } = useAuth(type as ROLE_TYPES);
  const { mutate: verify2fa, isPending: isVerifying } = useVerify2fa(() =>
    setIsError(true)
  );

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

  const handleBack = () => navigate(getBackLink());
  const handleVerify = (code: string) => {
    verify2fa({ token: code, email, role: type as ROLE_TYPES });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">2FA Verification</CardTitle>
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
