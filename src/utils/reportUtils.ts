import { REPORT_STATUS } from "@/lib/enums";

export const getStatusColor = (status: string) => {
  switch (status) {
    case REPORT_STATUS.Open:
      return "secondary";
    case REPORT_STATUS.Resolved:
      return "default";
    case REPORT_STATUS.Closed:
      return "destructive";
    default:
      return "outline";
  }
};

/**
 * This calculates 2 hours in milliseconds:
 * 2 hour
 * × 60 minutes per hou
 * × 60 seconds per minut
 * × 1000 milliseconds per second
 */
export const lastRequest = (lastUpdated: string) => {
  return Date.now() - new Date(lastUpdated).getTime() < 2 * 60 * 60 * 1000;
};
