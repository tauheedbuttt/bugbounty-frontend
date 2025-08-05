import { APPLICATION_TYPE, BOUNTY_TYPE, REWARD_TYPE } from "@/lib/enums";
import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { AdminProgramBounty, AdminProgramResponseData } from "../admin/program";

export interface HackerProgramsResponseData {
  _id: string;
  name: string;
  slug: string;
  profileImage: string;
  company: string;
  prices: {
    max: number;
    min: number;
  };
  bounties: HackerProgramBounty[];
  severity: BOUNTY_TYPE;
  rewardType: REWARD_TYPE;
  participantsCount: number;
  applicationTypes: APPLICATION_TYPE[];
  updatedAt: string;
}

export interface HackerProgramBounty extends AdminProgramBounty {
  totalReward: number;
}

export interface HackerProgramById
  extends Omit<AdminProgramResponseData, "members" | "bounties"> {
  severity: BOUNTY_TYPE;
  bounties: HackerProgramBounty[];
  prices: {
    max: number;
    min: number;
  };
}

export type HackerProgramResponse = ApiResponse<
  PaginatedResponse<HackerProgramsResponseData>
>;

export type HackerProgramByIdResponse = ApiResponse<{
  program: HackerProgramById;
}>;
