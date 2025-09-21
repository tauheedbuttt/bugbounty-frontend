import { USER_STATUS } from "@/lib/enums";

export const getStatusColor = (status: USER_STATUS) => {
  switch (status) {
    case USER_STATUS.Active:
      return "secondary";
    case USER_STATUS.TempBan:
      return "destructive";
    case USER_STATUS.PermBan:
      return "destructive";
    default:
      return "secondary";
  }
};
