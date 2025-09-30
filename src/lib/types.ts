// Base API response type with generic data
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface BaseQueryParams {
  page: number;
  limit: number;
  text?: string;
}
