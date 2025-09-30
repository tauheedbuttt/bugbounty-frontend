import {
  APPLICATION_TYPE,
  BOUNTY_TYPE,
  PROGRAM_DETAILS_TYPE,
  PROGRAM_STATUS,
  PROGRAM_VISIBILITY,
  REWARD_TYPE,
} from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface ProgramsQuery extends BaseQueryParams {
  status?: PROGRAM_STATUS;
  type?: APPLICATION_TYPE;
  severity?: BOUNTY_TYPE;
}

export interface AdminProgramResponseData {
  _id: string;
  name: string;
  profileImage: string;
  company: string;
  description: string;
  status: PROGRAM_STATUS;
  visibility: PROGRAM_VISIBILITY;
  applicationTypes: APPLICATION_TYPE[];
  reportsCount: number;
  participantsCount: number;
  updatedAt: string;
  bounties: AdminProgramBounty[];
  details: AdminProgramDetail[];
  assets: AdminProgramAsset[];
  rewardType: REWARD_TYPE;
}

export interface AdminProgramAsset {
  unique: string;
  name: string;
  url: string;
}

export interface AdminProgramDetail {
  type: PROGRAM_DETAILS_TYPE;
  unique: string;
  description: string;
}

export interface AdminProgramBounty {
  type: BOUNTY_TYPE;
  moneyReward: number;
  pointsReward: number;
  swagReward: string;
}

export interface AdminProgramCreateData {
  _id?: string;
  name: string;
  profileImage: string;
  image: string;
  company: string;
  description: string;
  applicationTypes: APPLICATION_TYPE[];
  rewardType: REWARD_TYPE;
  status: PROGRAM_STATUS;
  assets: AdminProgramAsset[];
  details: AdminProgramDetail[];
  bounties: AdminProgramBounty[];
  members: string[];
}

export interface AdminProgramActionsData {
  id: string;
  status?: PROGRAM_STATUS;
  visibility?: PROGRAM_VISIBILITY;
}

export interface AdminProgramDeleteData {
  email: string;
  password: string;
  id: string;
}

export interface ProgramStatusCount {
  status: PROGRAM_STATUS;
  count: number;
}

export interface ProgramStats {
  countsByStatus: ProgramStatusCount[];
  totalPrograms: number;
}

export type AdminProgramResponse = ApiResponse<
  PaginatedResponse<AdminProgramResponseData>
>;

export type AdminProgramStatsResponse = ApiResponse<{ stats: ProgramStats }>;

export type AdminProgramCreateResponse = ApiResponse<{
  program: AdminProgramCreateData;
}>;

export type AdminProgramActionResponse = ApiResponse<{
  program: {
    _id: string;
    name: string;
    status: PROGRAM_STATUS;
    visibility: PROGRAM_VISIBILITY;
  };
  action: "status" | "visibility";
}>;
