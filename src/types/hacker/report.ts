import {
  BOUNTY_TYPE,
  REPORT_STATUS,
  REPORT_TYPE,
  REWARD_TYPE,
} from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface ReportsQuery extends BaseQueryParams {
  status?: REPORT_STATUS;
  type?: REPORT_TYPE;
  severity?: BOUNTY_TYPE;
  requestedMediator?: boolean;
}

export interface ReportAttachments {
  supabaseId?: string;
  id: string;
  name: string;
  fileName: string; // Supabase filename
  url: string;
  type: string;
  size: number;
  uploading?: boolean;
}

export interface HackerReportCreateData {
  programId: string;
  name: string;
  domain: string;
  impact: string;
  remediation: string;
  proofOfConcept: string;
  summary: string;
  type: REPORT_TYPE;
  severity: BOUNTY_TYPE;
  status: REPORT_STATUS;
  termsAccepted: boolean;
  confidentialityAccepted: boolean;
  evaluationAccepted: boolean;
  attachments: ReportAttachments[];
  other?: string;
}

export interface HackerReportSeveritiesData {
  severity: BOUNTY_TYPE;
  count: number;
}

export interface HackerReportStatusData {
  status: REPORT_STATUS;
  count: number;
}

export interface ReportTrendData {
  month: number;
  resolved: number;
  reports: number;
}

export interface HackerReportMonthlyData {
  createdAt: string;
  count: number;
}

export interface HackerReportResponseData extends HackerReportCreateData {
  _id: string;
  id: string;
  reward: number;
}

export type HackerReportSeveritiesResponse = ApiResponse<{
  severites: HackerReportSeveritiesData[];
}>;

export type HackerReportStatusResponse = ApiResponse<{
  status: HackerReportStatusData[];
}>;

export type ReportTrendResponse = ApiResponse<{ trend: ReportTrendData[] }>;

export type HackerReportMonthlyResponse = ApiResponse<{
  monthly: HackerReportMonthlyData[];
}>;

export type HackerReportResponse = ApiResponse<
  PaginatedResponse<HackerReportResponseData>
>;

export type HackerReportCreateResponse = ApiResponse<{
  report: HackerReportResponseData;
}>;
