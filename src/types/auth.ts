import {
  ADMIN_ROLES,
  DEVICE_STATUS,
  PROGRAM_ROLES,
  ROLE_TYPES,
} from "@/lib/enums";
import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { LeaderboardData } from "./hacker/leaderboard";

export const PathMaps = {
  [ROLE_TYPES.Admin]: ROLE_TYPES.Admin,
  [ROLE_TYPES.Program]: ROLE_TYPES.Program,
  Researcher: ROLE_TYPES.Hacker,
};

export interface LoginData {
  email: string;
  password: string;
  browser: string;
}

export interface GoogleLoginData {
  code: string;
  browser: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface UsernameData {
  username: string;
}

export interface ProfileData {
  _id: string;
  id: string;
  email: string;
  phone: string;
  image?: string;
  hasPassword?: boolean;
  firstName: string;
  lastName: string;
  username: string;
  is2FA: string;
  isBlueBadge: string;
  jobTitle: string;
  country: string;
  biography: string;
  createdAt: string;
  stats: LeaderboardData;
}

export interface ChangePasswordData {
  old_password?: string;
  new_password: string;
  confirm_password: string;
  resetPasswordToken?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthenticatedVerify2faData {
  token: string;
}

export interface Verify2faData {
  role: ROLE_TYPES;
  email: string;
  token: string;
  browser?: string;
}

export interface QRData {
  secret: string;
  imageUrl: string;
  backupCodes: string[];
}

export interface UpdateProfileData extends Partial<ProfileData> {}

export interface LoginResponseData {
  is2FA: boolean;
  token: string;
  role: ROLE_TYPES;
  program?: string;
  email?: string;
  programName?: string;
  programRole?: PROGRAM_ROLES;
  adminRole?: ADMIN_ROLES;
}

export interface UsernameResponseData {
  available: string;
}

export interface SessionData {
  _id: string;
  id: string;
  browser: string;
  status: DEVICE_STATUS;
  createdAt: string;
  updatedAt: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type UsernameResponse = ApiResponse<UsernameResponseData>;
export type ProfileResponse = ApiResponse<UpdateProfileData>;
export type SessionResponse = ApiResponse<PaginatedResponse<SessionData>>;
export type QrResponse = ApiResponse<QRData>;

export type UsernameStatus = "idle" | "checking" | "available" | "taken";
