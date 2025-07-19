import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { PaymentData } from "@/types/payment";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import { PROGRAM_ROLES } from "@/lib/enums";

interface PaymentDialogProps {
  open: boolean;
  mode: "create" | "edit";
  payment: PaymentData;
  onSubmit: (values: { mtcnCode: string; amount: string }) => void;
  onClose: () => void;
  isPending: boolean;
}

export function PaymentDialog({
  open,
  mode,
  payment,
  onSubmit,
  onClose,
  isPending,
}: PaymentDialogProps) {
  // Remove $ for editing, add it back on submit/display
  const getRawAmount = (amountStr: string) => amountStr.replace(/^\$/, "");
  const [mtcnCode, setMtcnCode] = useState(payment.mtcnCode || "");
  const [amount, setAmount] = useState(getRawAmount(`${payment.amount}`));

  useEffect(() => {
    setMtcnCode(payment.mtcnCode || "");
    setAmount(getRawAmount(`${payment.amount}`));
  }, [open, payment]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent user from inputting the $ or letters at start, allow decimals
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Send WU MTCN Code" : "Edit Payment"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? `Enter the WU MTCN code to mark payment as paid to ${payment.researcher}.`
              : `View or edit the MTCN code and payment amount.`}
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!mtcnCode) return;
            onSubmit({ mtcnCode, amount });
          }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">WU MTCN Code</label>

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
                placeholder="Enter WU MTCN code"
                maxLength={15}
                required
              />
            </ProgramProtectedComponent>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
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
                  placeholder="Enter amount"
                  required
                  type="text"
                  inputMode="decimal"
                  className="pl-7"
                  min={0}
                />
              </ProgramProtectedComponent>
            </div>
          </div>
          <ProgramProtectedComponent
            allowedRoles={[PROGRAM_ROLES.Accountant, PROGRAM_ROLES.SuperAdmin]}
          >
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={isPending} type="submit">
                {mode === "create" ? "Send" : "Save"}
              </Button>
            </DialogFooter>
          </ProgramProtectedComponent>
        </form>
      </DialogContent>
    </Dialog>
  );
}
