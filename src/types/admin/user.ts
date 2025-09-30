import {
  ADMIN_ROLES,
  PROGRAM_ROLES,
  ROLE_TYPES,
  USER_STATUS,
} from "@/lib/enums";
import { ApiResponse, BaseQueryParams, PaginatedResponse } from "@/lib/types";

export interface UsersQuery extends BaseQueryParams {
  role?: ROLE_TYPES;
  status?: USER_STATUS;
  adminRole?: ADMIN_ROLES;
  programRole?: PROGRAM_ROLES;
}

export interface AdminUserResponseData {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isBlueBadge: boolean;
  status: USER_STATUS;
  role: ROLE_TYPES;
  adminRole?: ADMIN_ROLES;
  createdAt: string;
  reputation: number;
  reportsSubmitted: number;
  reportsAccepted: number;
  totalEarnings: number;
}

export interface AdminUserBlueBadgeData {
  id: string;
  isBlueBadge: boolean;
}

export interface AdminInviteUserData {
  email: string;
  role: ADMIN_ROLES;
}

export interface AdminDeleteData {
  id: string;
}

export interface AdminRoleData {
  id: string;
  role: ADMIN_ROLES;
}

export interface AdminUserBanData {
  id: string;
  status: USER_STATUS;
  banDays?: number;
}

export interface AdminBlueBadgResponseData {
  _id: string;
  isBlueBadge: boolean;
}

export interface AdminUserBanResponseData {
  _id: string;
  status: USER_STATUS;
  banDays?: number;
  banExpire?: Date;
}

export interface ResearcherStats {
  countsByStatus: { status: string; count: number }[];
  totalResearchers: number;
  blueBadge: number;
}

export type AdminUserResponse = ApiResponse<
  PaginatedResponse<AdminUserResponseData>
>;

export type AdminBlueBadgResponse = ApiResponse<{
  user: AdminBlueBadgResponseData;
}>;

export type AdminUserBanResponse = ApiResponse<{
  user: AdminUserBanResponseData;
}>;

export type AdminInviteResponse = ApiResponse<{
  user: AdminUserResponseData;
}>;

export type AdminResearcherStatsResponse = ApiResponse<{
  stats: ResearcherStats;
}>;
