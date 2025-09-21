import { ApiResponse } from "@/lib/types";

// Monthly report statistics
export interface MonthlyReport {
  count: number;
  percentage: number;
}

// Dashboard data structure
export interface AdminDashboardData {
  programs: number;
  hackers: number;
  bannedHackers: number;
  pendingReports: number;
  criticalReports: number;
  monthReport: MonthlyReport;
}

export interface AdminDashboardReportMonthlyData {
  createdAt: string;
  count: number;
}

export type AdminDashboardResponse = ApiResponse<AdminDashboardData>;

export type AdminDashboardReportMonthlyResponse = ApiResponse<{
  monthly: AdminDashboardReportMonthlyData[];
}>;
