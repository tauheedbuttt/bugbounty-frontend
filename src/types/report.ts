import { BOUNTY_TYPE, REPORT_STATUS, REPORT_TYPE } from "@/lib/enums";
import { ApiResponse } from "@/lib/types";
import { Comment } from "./comment";

export interface ReportByIdResponseData {
  _id: string;
  id: string;
  name: string;
  status: string;
  severity: string;
  researcher: {
    username: string;
  };
  mediator: {
    _id: string;
    username: string;
  };
  program: {
    name: string;
  };
  comments: Comment[];
  createdAt: string;
  domain: string;
  type: REPORT_TYPE;
  summary: string;
  proofOfConcept: string;
  impact: string;
  remediation: string;
  reward: number;
  requestedMediator?: boolean;
  requestedMediatorDate?: string;
}

export interface ChangesReportData {
  id: string;
  status?: REPORT_STATUS;
  severity?: BOUNTY_TYPE;
  mediator: string;
}

export interface ApproveReportData {
  id: string;
  reward: number;
}

export interface RequestMediatorData {
  id: string;
}

export type ReportByIdResponse = ApiResponse<{
  report: ReportByIdResponseData;
}>;
