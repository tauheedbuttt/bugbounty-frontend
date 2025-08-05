import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface TempBanDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (days: number) => void;
  researcherName?: string;
}

export function TempBanDialog({
  open,
  onClose,
  onConfirm,
  researcherName,
}: TempBanDialogProps) {
  const { t, currentLanguage } = useTranslation();
  const [days, setDays] = useState<number | "">("");

  const handleConfirm = () => {
    if (!days || Number(days) <= 0) return;
    onConfirm(Number(days));
    setDays("");
  };

  React.useEffect(() => {
    if (!open) setDays("");
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader
          className={cn(
            "flex w-full",
            currentLanguage === "ar" ? "justify-end flex-row-reverse" : ""
          )}
        >
          <DialogTitle>
            {t.common.buttons.temporary_ban}{" "}
            {researcherName ? `"${researcherName}"` : "Researcher"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-3">
          <label className="text-sm font-medium">
            {t.forms.labels.duration_in_days}
          </label>
          <Input
            type="number"
            min={1}
            value={days}
            onChange={(e) =>
              setDays(e.target.value ? Number(e.target.value) : "")
            }
            placeholder="e.g. 7"
            className="w-32"
          />
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            {t.common.buttons.cancel}
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleConfirm}
            disabled={!days || Number(days) <= 0}
          >
            {t.common.buttons.ban}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
