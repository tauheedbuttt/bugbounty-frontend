import { BOUNTY_TYPE, REPORT_STATUS } from "@/lib/enums";
import { ApiResponse, PaginatedResponse } from "@/lib/types";

export interface AdminReportResponseData {
  _id: string;
  id: string;
  name: string;
  status: REPORT_STATUS;
  severity: BOUNTY_TYPE;
  reward: number;
  researcher: {
    username: string;
  };
  program: {
    name: string;
  };
  createdAt: string;
}

export interface ReportStats {
  totalReports: number;
  pendingReview: number;
  thisMonth: number;
  critical: number;
}

export type AdminReportResponse = ApiResponse<
  PaginatedResponse<AdminReportResponseData>
>;

export type AdminReportStatsResponse = ApiResponse<{
  stats: ReportStats;
}>;
