import { DEVICE_STATUS } from "@/lib/enums";
import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { LeaderboardData } from "./hacker/leaderboard";

export interface LoginData {
  email: string;
  password: string;
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
  firstName: string;
  lastName: string;
  username: string;
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

export interface UpdateProfileData extends Partial<ProfileData> {}

export interface LoginResponseData {
  token: string;
  role: string;
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

export type UsernameStatus = "idle" | "checking" | "available" | "taken";
