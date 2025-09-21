export const ROUTE_PATHS = {
  // Landing
  LANDING: {
    LANDING: "/",
    LEADERBOARD: "/leaderboard",
    PROGRAMS: "/programs",
    PROGRAM_DETAILS: "/programs/:id",
    HALL_OF_FAME: "/hall-of-fame",
    ABOUT_US: "/about-us",
    CONTACT_US: "/contact-us",
    SOCIAL_MEDIA: "/social-media",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_SERVICE: "/terms-of-service",
  },

  // Auth
  HACKER_LOGIN: "/researcher/login",
  HACKER_SIGNUP: "/researcher/signup",
  HACKER_FORGOT_PASSWORD: "/researcher/forgot-password",
  PROGRAM_LOGIN: "/program/login",
  PROGRAM_FORGOT_PASSWORD: "/program/forgot-password",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_FORGOT_PASSWORD: "/admin/forgot-password",
  RESET_PASSWORD: "/:type/reset",
  MFA: "/:type/2fa",

  // Hacker/Researcher
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  HACKER_LEADERBOARD: "/researcher/leaderboard",
  HACKER_PROGRAMS: "/researcher/programs",
  HACKER_PROGRAM_DETAILS: "/researcher/programs/:id",
  SUBMIT_REPORT: "/programs/:id/submit",
  REPORTS: "/reports",
  REPORTS_DETAILS: "/reports/:id",
  BOUNTIES: "/bounties",
  PROFILE: "/profile",
  RESEARCHER_PROFILE: "/@:handle/",

  // Program
  PROGRAM_REPORTS: "/program/reports",
  PROGRAM_TRIAGERS: "/program/triagers",
  PROGRAM_ANALYTICS: "/program/analytics",
  PROGRAM_PAYMENTS: "/program/payments",
  PROGRAM_REPORT_DETAILS: "/program/report/:id",

  // Admin
  ADMIN_DASHBOARD: "/admin",
  ADMIN_PROGRAMS: "/admin/programs",
  ADMIN_CREATE_PROGRAM: "/admin/programs/create",
  ADMIN_RESEARCHERS: "/admin/researchers",
  ADMIN_ADMINS: "/admin/admins",
  ADMIN_HACKERS: "/admin/hackers",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_MEDIATOR: "/admin/mediator",
  ADMIN_REPORT_DETAILS: "/admin/reports/:id",
} as const;
