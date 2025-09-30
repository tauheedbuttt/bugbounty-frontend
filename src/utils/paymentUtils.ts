import { PAYMENT_STATUS } from "@/lib/enums";

export const getStatusColor = (status: string) => {
  switch (status) {
    case PAYMENT_STATUS.Paid:
      return "secondary";
    case PAYMENT_STATUS.Pending:
      return "default";
    default:
      return "destructive";
  }
};
