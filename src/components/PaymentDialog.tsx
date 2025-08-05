import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useStorage from "@/hooks/supabase/use-storage";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { PROGRAM_ROLES } from "@/lib/enums";
import { PaymentData } from "@/types/payment";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import ReportAttachementViewer from "./ReportAttachementViewer";

interface PaymentDialogProps {
  open: boolean;
  mode: "create" | "edit";
  payment: PaymentData;
  onSubmit?: (values: {
    mtcnCode: string;
    amount: string;
    image: string;
  }) => void;
  onClose: () => void;
  isPending?: boolean;
}

export function PaymentDialog({
  open,
  mode,
  payment,
  onSubmit,
  onClose,
  isPending,
}: PaymentDialogProps) {
  const { handleFileUpload, uploading } = useStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  // Remove $ for editing, add it back on submit/display
  const getRawAmount = (amountStr: string) => amountStr.replace(/^\$/, "");
  const [mtcnCode, setMtcnCode] = useState(payment.mtcnCode || "");
  const [amount, setAmount] = useState(getRawAmount(`${payment.amount}`));
  const [image, setImage] = useState(payment.image ?? "");

  useEffect(() => {
    setMtcnCode(payment.mtcnCode || "");
    setAmount(getRawAmount(`${payment.amount}`));
    setImage(payment.image ?? "");
  }, [open, payment]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent user from inputting the $ or letters at start, allow decimals
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [".pdf", ".png", ".jpg", ".jpeg"];

  const validateFile = (file: File): string | null => {
    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(fileExtension)) {
      return `File type ${fileExtension} is not allowed`;
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      return t.common.errors.file_size_must_be_less_than_5mb;
    }

    return null;
  };

  const handleFileSelection = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({ title: validationError });
      return;
    }

    // Upload file
    const uploadResult = await handleFileUpload(
      {
        target: { files: [file] },
      },
      "payments"
    );

    setImage(uploadResult.url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelection(e.target.files?.[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files?.[0]) {
      handleFileSelection(e.dataTransfer.files?.[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const extractFileInfo = (url: string) => {
    const urlParts = url.split("/");
    const fileNameWithExtension = urlParts[urlParts.length - 1];

    // Decode URL-encoded filename
    const decodedFileName = decodeURIComponent(fileNameWithExtension);

    // Extract extension
    const extension = "." + decodedFileName.split(".").pop()?.toLowerCase();

    return {
      name: decodedFileName,
      type: extension,
    };
  };

  const fileInfo = extractFileInfo(image ?? "");
  const isDisabled = !mtcnCode || !image || !amount;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!onSubmit
              ? t.common.buttons.payment_details
              : mode === "create"
              ? t.common.buttons.send_wu_mtcn_code
              : t.common.buttons.edit_payment}
          </DialogTitle>
          <DialogDescription>
            {!onSubmit
              ? t.common.buttons.view_mtcn_and_amount
              : mode === "create"
              ? t.forms.placeholders.enter_the_wu_mtcn_code_to_mark.replace(
                  "${payment.researcher}",
                  `${payment.researcher.username}`
                )
              : t.common.buttons.view_or_edit_mtcn_and_amount}
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (isDisabled) return;
            if (onSubmit) onSubmit({ mtcnCode, amount, image });
          }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t.forms.labels.wu_mtcn_code}
            </label>

            <ProgramProtectedComponent
              allowedRoles={[
                PROGRAM_ROLES.Accountant,
                PROGRAM_ROLES.SuperAdmin,
                PROGRAM_ROLES.ViewerAdmin,
              ]}
              disabled
            >
              <Input
                value={mtcnCode}
                onChange={(e) => setMtcnCode(e.target.value)}
                placeholder={t.forms.placeholders.enter_wu_mtcn_code}
                maxLength={15}
                required
                disabled={!onSubmit}
              />
            </ProgramProtectedComponent>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t.forms.labels.amount}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none">
                $
              </span>
              <ProgramProtectedComponent
                allowedRoles={[
                  PROGRAM_ROLES.Accountant,
                  PROGRAM_ROLES.SuperAdmin,
                  PROGRAM_ROLES.ViewerAdmin,
                ]}
                disabled
              >
                <Input
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={t.forms.placeholders.enter_amount}
                  required
                  type="text"
                  inputMode="decimal"
                  className="pl-7"
                  min={0}
                  disabled={!onSubmit}
                />
              </ProgramProtectedComponent>
            </div>
          </div>
          {!onSubmit && !image ? null : (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.common.buttons.attachments}
              </label>
              <div className="relative flex gap-5 flex-col">
                <ProgramProtectedComponent
                  allowedRoles={[
                    PROGRAM_ROLES.Accountant,
                    PROGRAM_ROLES.SuperAdmin,
                    PROGRAM_ROLES.ViewerAdmin,
                  ]}
                  disabled
                >
                  {/* Upload Area */}
                  {onSubmit && (
                    <>
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={openFileDialog}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        {uploading ? (
                          <Loader2 className="h-8 w-8 mx-auto mb-4  text-muted-foreground animate-spin" />
                        ) : (
                          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        )}
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">
                            {t.common.buttons.attach_files_by_dragging_dropping}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.common.buttons.max_attachments_info.replace(
                            "{MAX_FILES}",
                            ""
                          )}
                          <br />
                          {t.common.buttons.allowed_file_types} (.pdf, .png,
                          .jpg)
                        </p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ALLOWED_TYPES.join(",")}
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </>
                  )}
                  {image && (
                    <div className="border-2 border-border rounded-lg p-4 relative">
                      <ReportAttachementViewer
                        attachment={{
                          name: fileInfo.name,
                          url: image,
                          type: fileInfo.type,
                        }}
                      />
                    </div>
                  )}
                </ProgramProtectedComponent>
              </div>
            </div>
          )}
          {onSubmit && (
            <ProgramProtectedComponent
              allowedRoles={[
                PROGRAM_ROLES.Accountant,
                PROGRAM_ROLES.SuperAdmin,
              ]}
            >
              <DialogFooter className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  {t.common.buttons.cancel}
                </Button>
                <Button
                  isLoading={isPending}
                  disabled={isPending || uploading || isDisabled}
                  type="submit"
                  title={isDisabled ? "Please enter all 3 details" : ""}
                  titlePosition="bottom"
                >
                  {mode === "create"
                    ? t.common.buttons.send
                    : t.common.buttons.save}
                </Button>
              </DialogFooter>
            </ProgramProtectedComponent>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
