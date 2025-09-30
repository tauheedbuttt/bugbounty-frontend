import { create } from "zustand";
import Cookies from "js-cookie";
import {
  ADMIN_ROLES,
  COOKIES,
  LOCAL_STORAGE,
  PROGRAM_ROLES,
  ROLE_TYPES,
} from "../lib/enums";
import { removeLocalUser } from "@/utils/authUtils";

// Define the store state interface
interface LoginStoreData {
  token: string;
  role: ROLE_TYPES;
  isOnlySet?: boolean;
  adminRole?: ADMIN_ROLES;
  programRole?: PROGRAM_ROLES;
  program?: string;
  programName?: string;
  programLogo?: string;
}

interface AuthState {
  token?: string;
  role?: ROLE_TYPES;
  adminRole?: ADMIN_ROLES;
  programRole?: PROGRAM_ROLES;
  program?: string;
  programName?: string;
  programLogo?: string;
  login: (data: LoginStoreData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: "",
  login: ({
    token,
    role,
    adminRole,
    programRole,
    program,
    programName,
    programLogo,
    isOnlySet = false,
  }: LoginStoreData) => {
    set({
      token,
      role,
      adminRole,
      programRole,
      program,
      programName,
      programLogo,
    });
    if (isOnlySet) return;
    localStorage.setItem(LOCAL_STORAGE.ROLE, role);
    if (adminRole) localStorage.setItem(LOCAL_STORAGE.ADMIN_ROLE, adminRole);
    if (programRole)
      localStorage.setItem(LOCAL_STORAGE.PROGRAM_ROLE, programRole);
    if (program) localStorage.setItem(LOCAL_STORAGE.PROGRAM, program);
    if (programName)
      localStorage.setItem(LOCAL_STORAGE.PROGRAM_NAME, programName);
    if (programLogo)
      localStorage.setItem(LOCAL_STORAGE.PROGRAM_LOGO, programLogo);
    Cookies.set(COOKIES.TOKEN, token, { expires: 7, path: "/" });
  },
  logout: () => {
    set({ token: "", role: undefined });
    removeLocalUser();
  },
}));
