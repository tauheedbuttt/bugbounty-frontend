import { create } from "zustand";
import Cookies from "js-cookie";
import { COOKIES, LOCAL_STORAGE, ROLE_TYPES } from "../lib/enums";
import { removeLocalUser } from "@/utils/authUtils";

// Define the store state interface
interface AuthState {
  token?: string;
  role?: ROLE_TYPES;
  login: (token: string, role: ROLE_TYPES, isOnlySet?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: "",
  login: (token: string, role: ROLE_TYPES, isOnlySet?: boolean) => {
    set({ token, role });
    if (isOnlySet) return;
    localStorage.setItem(LOCAL_STORAGE.ROLE, role);
    Cookies.set(COOKIES.TOKEN, token, { expires: 7, path: "/" });
  },
  logout: () => {
    set({ token: "", role: undefined });
    removeLocalUser();
  },
}));
