import { BOUNTY_TYPE, REPORT_STATUS, REPORT_TYPE } from "@/lib/enums";
import { ApiResponse } from "@/lib/types";
import { Comment } from "./comment";
import { ReportAttachments } from "./hacker/report";

export interface ReportByIdResponseData {
  _id: string;
  id: string;
  name: string;
  status: string;
  severity: string;
  other?: string;
  researcher: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  mediator: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  triagger: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
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
  attachments: ReportAttachments[];
}

export interface ChangesReportData {
  id: string;
  status?: REPORT_STATUS;
  severity?: BOUNTY_TYPE;
  mediator?: string;
  triagger?: string;
}

export interface ApproveReportData {
  id: string;
  reward: number;
}

export interface RequestMediatorData {
  id: string;
}

export interface ViewReportData {
  id: string;
  mediator: boolean;
}

export type ReportByIdResponse = ApiResponse<{
  report: ReportByIdResponseData;
}>;
