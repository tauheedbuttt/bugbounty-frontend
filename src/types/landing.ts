import { ApiResponse } from "@/lib/types";

export interface LandingDataResponseData {
  reports: number;
  programs: number;
  hackers: number;
}

export type LandingDataResponse = ApiResponse<LandingDataResponseData>;
