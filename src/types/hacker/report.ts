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
}

export interface HackerReportSeveritiesData {
  severity: BOUNTY_TYPE;
  count: number;
}

export interface HackerReportMonthlyData {
  createdAt: string;
  count: number;
}

export interface HackerReportResponseData extends HackerReportCreateData {
  _id: string;
  reward: number;
}

export type HackerReportSeveritiesResponse = ApiResponse<{
  severites: HackerReportSeveritiesData[];
}>;

export type HackerReportMonthlyResponse = ApiResponse<{
  monthly: HackerReportMonthlyData[];
}>;

export type HackerReportResponse = ApiResponse<
  PaginatedResponse<HackerReportResponseData>
>;

export type HackerReportCreateResponse = ApiResponse<{
  report: HackerReportResponseData;
}>;
