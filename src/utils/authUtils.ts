import Cookies from "js-cookie";
import { COOKIES, LOCAL_STORAGE } from "../lib/enums";

export const removeLocalUser = () => {
  localStorage.removeItem(LOCAL_STORAGE.ROLE);
  localStorage.removeItem(LOCAL_STORAGE.ADMIN_ROLE);
  localStorage.removeItem(LOCAL_STORAGE.PROGRAM_ROLE);
  localStorage.removeItem(LOCAL_STORAGE.PROGRAM);
  localStorage.removeItem(LOCAL_STORAGE.PROGRAM_NAME);
  localStorage.removeItem(LOCAL_STORAGE.PROGRAM_LOGO);
  Cookies.remove(COOKIES.TOKEN, { path: "/" });
  window.location.href = "/";
};
