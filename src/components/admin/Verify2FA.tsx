import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Verify2FAProps {
  onBack?: () => void;
  onVerify: (code: string, isBackup?: boolean) => void;
  loading?: boolean;
  hideButtons?: boolean;
  allowBackupCode?: boolean;
}

const Verify2FA = ({
  onBack,
  onVerify,
  loading,
  hideButtons = false,
  allowBackupCode = false,
}: Verify2FAProps) => {
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6 || (useBackupCode && code.length > 0)) {
      onVerify(code, useBackupCode);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = useBackupCode
      ? e.target.value.slice(0, 8)
      : e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);

    setCode(value);

    if (!useBackupCode && value.length === 6) {
      onVerify(value);
    }

    if (useBackupCode && value.length === 8) {
      onVerify(value);
    }
  };

  return (
    <div
      className={cn(
        "bg-background rounded-lg max-w-md mx-auto  border-gray-200",
        hideButtons ? "" : "p-6 shadow-lg border"
      )}
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Verify Your Setup
        </h3>
        <p className="text-sm text-gray-600">
          {useBackupCode
            ? "Enter your backup code to verify your identity."
            : "Enter the 6-digit code from your authenticator app."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {useBackupCode ? "Backup Code" : "Verification Code"}
          </label>
          <input
            type="text"
            value={code}
            onChange={handleInputChange}
            placeholder={useBackupCode ? "Backup Code" : "000000"}
            className="bg-background w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 tracking-widest"
            maxLength={useBackupCode ? 16 : 6}
            autoComplete="off"
          />
          {!useBackupCode && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              {code.length}/6 digits
            </p>
          )}
        </div>
        {allowBackupCode && (
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                setUseBackupCode(!useBackupCode);
                setCode("");
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              {useBackupCode
                ? "Use authenticator code instead"
                : "Use backup code instead"}
            </button>
          </div>
        )}
        {!hideButtons && (
          <div className="flex gap-3">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to QR
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1"
              disabled={
                loading ||
                (useBackupCode ? code.length === 0 : code.length !== 6)
              }
            >
              {loading ? "Verifying..." : "Verify & Enable"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Verify2FA;
