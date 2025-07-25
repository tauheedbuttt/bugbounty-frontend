import { COOKIES } from "@/lib/enums";
import { removeLocalUser } from "@/utils/authUtils";
import axios from "axios";
import Cookies from "js-cookie";

// Helper function to get token from cookies
function getTokenFromCookies(): string | null {
  return Cookies.get(COOKIES.TOKEN);
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Extracted from Vite environment variable
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to set Authorization header
apiClient.interceptors.request.use((config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle unauthorized responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeLocalUser();
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    const message = error.response.data.message;
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    return message;
  }
  return `HTTP error! status: ${error.response?.status ?? "unknown"}`;
};

export default apiClient;
