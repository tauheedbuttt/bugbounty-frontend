import { ApiResponse, PaginatedResponse } from "@/lib/types";

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
}

export type LeaderboardDataResponse = ApiResponse<
  PaginatedResponse<LeaderboardData>
>;
