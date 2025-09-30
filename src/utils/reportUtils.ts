import { BOUNTY_TYPE, REPORT_STATUS } from "@/lib/enums";

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

export const getStatusColorCodes = (status: string) => {
  switch (status) {
    case REPORT_STATUS.Open:
      return "#f59e42";
    case REPORT_STATUS.Resolved:
      return "#22c55e";
    case REPORT_STATUS.Closed:
      return "#22c55e";
    default:
      return "#6b7280";
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

export const vulnerabilityColorMap: Record<string, string> = {
  [BOUNTY_TYPE.Critical]: "#ef4444",
  [BOUNTY_TYPE.High]: "#f97316",
  [BOUNTY_TYPE.Medium]: "#eab308",
  [BOUNTY_TYPE.Low]: "#22c55e",
  [BOUNTY_TYPE.Informational]: "#3b82f6",
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
