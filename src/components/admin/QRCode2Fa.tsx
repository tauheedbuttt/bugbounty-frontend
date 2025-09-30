import { QRData } from "@/types/auth";
import React from "react";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCode2FaProps {
  qr: QRData;
  onNext: () => void;
}

const QRCode2Fa = ({ qr, onNext }: QRCode2FaProps) => {
  const downloadBackupCodes = () => {
    const content = `Two-Factor Authentication Backup Codes\n\nGenerated on: ${new Date().toLocaleDateString()}\n\nIMPORTANT: Keep these codes safe and secure. Each code can only be used once.\n\nBackup Codes:\n${qr.backupCodes
      .map((code, index) => `${index + 1}. ${code}`)
      .join(
        "\n"
      )}\n\nIf you lose access to your authenticator app, you can use these codes to regain access to your account.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-codes-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Set Up Two-Factor Authentication
        </h3>
        <p className="text-sm text-gray-600">
          Scan this QR code with your authenticator app
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <img
            src={qr.imageUrl}
            alt="QR Code for 2FA setup"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Manual Entry Code:
        </label>
        <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
          <code className="text-sm font-mono text-gray-800 break-all">
            {qr.secret}
          </code>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Backup Codes</h4>
          <button
            onClick={downloadBackupCodes}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
        <p className="text-xs text-amber-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Save these codes in a secure location
        </p>
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            {qr.backupCodes.map((code, index) => (
              <div
                key={index}
                className="bg-white px-3 py-2 rounded border border-gray-200 font-mono text-sm text-gray-700 text-center"
              >
                {code}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onNext} className="flex items-center gap-2">
          I've Scanned the QR Code
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QRCode2Fa;
