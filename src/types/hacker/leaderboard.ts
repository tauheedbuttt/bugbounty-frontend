import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface LeaderboardQueryParams extends BaseQueryParams {
  isHallOfFame?: boolean;
}

export interface LeaderboardData {
  bounties: number;
  maxBounty: number;
  points: number;
  rank: number;
  reports: number;
  user?: {
    _id: string;
    username: string;
    image: string;
    country: string;
    isBlueBadge: boolean;
  };
  report?: {
    createdAt: string;
  };
}

export type LeaderboardDataResponse = ApiResponse<
  PaginatedResponse<LeaderboardData>
>;

export type LeaderboardYearsDataResponse = ApiResponse<{ years: number[] }>;
