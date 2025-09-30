import { PROGRAM_ROLES, ROLE_TYPES, USER_STATUS } from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface UsersQuery extends BaseQueryParams {
  role?: ROLE_TYPES;
  status?: USER_STATUS;
}

export interface ProgramUserResponseData {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  status: USER_STATUS;
  role: ROLE_TYPES;
  programmembers: {
    role?: PROGRAM_ROLES;
  };
  createdAt: string;
}

export interface ProgramResearcherResponseData {
  researcher: {
    _id: string;
    username: string;
    isBlueBadge: boolean;
  };
  count: number;
}

export interface ProgramInviteUserData {
  email: string;
  programRole: PROGRAM_ROLES;
}

export interface ProgramDeleteData {
  id: string;
}

export interface ProgramRoleData {
  id: string;
  role: PROGRAM_ROLES;
}

export type ProgramUserResponse = ApiResponse<
  PaginatedResponse<ProgramUserResponseData>
>;

export type ProgramResearcherResponse = ApiResponse<{
  researchers: ProgramResearcherResponseData[];
}>;

export type ProgramInviteResponse = ApiResponse<{
  user: ProgramUserResponseData;
}>;
