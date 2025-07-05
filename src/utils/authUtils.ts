import Cookies from "js-cookie";
import { COOKIES, LOCAL_STORAGE } from "../lib/enums";

export const removeLocalUser = () => {
  localStorage.removeItem(LOCAL_STORAGE.ROLE);
  Cookies.remove(COOKIES.TOKEN, { path: "/" });
  window.location.href = "/";
};
