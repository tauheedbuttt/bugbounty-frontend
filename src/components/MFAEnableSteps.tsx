import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { useAuth } from "@/hooks/apis/use-auth";
import { useAuthStore } from "@/stores/auth";
import { QRData } from "@/types/auth";
import QRCode2Fa from "./admin/QRCode2Fa";
import Verify2FA from "./admin/Verify2FA";

export interface MFAEnableStepsRef {
  handleEnable: () => void;
  loading: boolean;
}

interface MFAEnableStepsProps {
  onSuccess?: () => void;
  onSuccessVerify?: () => void;
  fetchDefault?: boolean;
}

export const MFAEnableSteps = forwardRef<
  MFAEnableStepsRef,
  MFAEnableStepsProps
>(({ onSuccess, onSuccessVerify, fetchDefault }, ref) => {
  const { role } = useAuthStore();
  const { useGetQR, useAuthenticatedVerify2faData } = useAuth(role);
  const [qr, setQr] = useState<QRData | undefined>();
  const [step, setStep] = useState<"qr" | "verify">("qr");

  const { mutate: authenticatedVerify2fa, isPending: isVerifying } =
    useAuthenticatedVerify2faData(() => {
      setQr(undefined);
      onSuccessVerify();
    });

  const { mutate: getQr, isPending: loading } = useGetQR((data) => {
    setQr(data);
    setStep("qr");
    onSuccess?.();
  });

  const handleEnable = () => getQr();

  const handleNext = () => setStep("verify");

  const handleBack = () => setStep("qr");

  const handleVerify = (code: string) => {
    authenticatedVerify2fa({ token: code });
  };

  useImperativeHandle(ref, () => ({
    handleEnable,
    loading,
  }));

  useEffect(() => {
    if (fetchDefault) getQr();
  }, [fetchDefault]);

  return (
    <div>
      {qr?.imageUrl && (
        <>
          {step === "qr" && <QRCode2Fa qr={qr} onNext={handleNext} />}
          {step === "verify" && (
            <Verify2FA
              onBack={handleBack}
              onVerify={handleVerify}
              loading={isVerifying}
            />
          )}
        </>
      )}
    </div>
  );
});

MFAEnableSteps.displayName = "MFAEnableSteps";
