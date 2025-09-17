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
  seen?: boolean;
  mediationSeen?: boolean;
  triaggerSeen?: boolean;
  mediator?: string;
}

export interface ReportStats {
  totalReports: number;
  pendingReview: number;
  thisMonth: number;
  critical: number;
}

export interface ProgramReportStats {
  total: number;
  new: number;
  ongoing: number;
  resolved: number;
}

export interface Analytics {
  totalReports: {
    total: number;
    current: number;
    previous: number;
    change: number; // % change
  };
  totalPaid: {
    total: number; // amount
    current: number; // amount
    previous: number; // amount
    change: number; // % change
  };
  avgResponseTime: number; // in days, float
  totalResearchers: {
    total: number;
    current: number;
    previous: number;
    change: number; // % change
  };
}

export interface UnseenReports {
  reports: string;
  mediations: string;
  triaggers: string;
}

export type AdminReportResponse = ApiResponse<
  PaginatedResponse<AdminReportResponseData>
>;

export type AdminReportStatsResponse = ApiResponse<{
  stats: ReportStats;
}>;

export type ProgramReportStatsResponse = ApiResponse<{
  stats: ProgramReportStats;
}>;

export type AnalyticsStatsResponse = ApiResponse<Analytics>;
export type UnseenReportsResponse = ApiResponse<UnseenReports>;
