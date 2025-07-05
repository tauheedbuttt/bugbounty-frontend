
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TempBanDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (days: number) => void;
  researcherName?: string;
}

export function TempBanDialog({ open, onClose, onConfirm, researcherName }: TempBanDialogProps) {
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
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Temporary Ban {researcherName ? `"${researcherName}"` : "Researcher"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-3">
          <label className="text-sm font-medium">
            Duration (in days):
          </label>
          <Input
            type="number"
            min={1}
            value={days}
            onChange={e => setDays(e.target.value ? Number(e.target.value) : "")}
            placeholder="e.g. 7"
            className="w-32"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            type="button"
            variant="default"
            onClick={handleConfirm}
            disabled={!days || Number(days) <= 0}
          >
            Ban
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
