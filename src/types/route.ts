
export interface RouteGuard {
  requiresAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  guard?: RouteGuard;
  layout?: 'landing' | 'auth' | 'dashboard';
}