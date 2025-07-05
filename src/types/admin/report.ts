import { ApiResponse, PaginatedResponse } from "@/lib/types";

export interface AdminReportResponseData {
  _id: string;
  id: string;
  name: string;
  status: string;
  severity: string;
  reward: number;
  researcher: {
    username: string;
  };
  program: {
    name: string;
  };
  createdAt: string;
}

export type AdminReportResponse = ApiResponse<
  PaginatedResponse<AdminReportResponseData>
>;
