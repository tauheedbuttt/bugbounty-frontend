export enum COOKIES {
  TOKEN = "auth_token",
}

export enum LOCAL_STORAGE {
  ROLE = "role",
}

export enum ROLE_TYPES {
  Admin = "Admin",
  Program = "Program",
  Hacker = "Hacker",
}

export enum ADMIN_ROLES {
  SuperAdmin = "Super Admin",
  ReaderAdmin = "Reader Admin",
  Mediator = "Mediator",
}

export enum PROGRAM_ROLES {
  SuperAdmin = "Super Admin",
  Triager = "Triager",
  Accountant = "Accountant",
  ViewerAdmin = "Viewer dmin",
}

export enum USER_STATUS {
  Active = "Active",
  TempBan = "Temp Ban",
  PermBan = "Perm Ban",
}

export enum PROGRAM_STATUS {
  Active = "Active",
  Paused = "Paused",
  Closed = "Closed",
}

export enum PROGRAM_VISIBILITY {
  Public = "Public",
  Private = "Private",
}

export enum APPLICATION_TYPE {
  Web = "Web Application",
  Mobile = "Mobile Application",
  API = "API",
}

export enum PROGRAM_DETAILS_TYPE {
  Scope = "Scope",
  OutOfScope = "Out of Scope",
  Guidelines = "Guidelines",
}

export enum REWARD_TYPE {
  Bounty = "Bounty",
  Points = "Points",
  Mixed = "Mixed",
}

export enum BOUNTY_TYPE {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
  Informational = "Informational",
}

export enum PAYMENT_STATUS {
  Processing = "Processing",
  Pending = "Pending",
  Paid = "Paid",
}

export enum PAYMENT_LOG_STATUS {
  Paid = "Paid",
  Failed = "Failed",
}

export enum REPORT_TYPE {
  XSS = "Cross-Site Scripting (XSS)",
  SQLInjection = "SQL Injection",
  CSRF = "Cross-Site Request Forgery (CSRF)",
  IDOR = "Insecure Direct Object Reference (IDOR)",
  RCE = "Remote Code Execution (RCE)",
  LFI = "Local File Inclusion (LFI)",
  Other = "Other",
}

export enum ATTACHMENT_TYPE {
  PDF = "pdf",
  PNG = "png",
  JPG = "jpg",
  TXT = "txt",
  DOCS = "docs",
}

export enum REPORT_STATUS {
  Open = "Open",
  Triaged = "Triaged",
  Resolved = "Resolved",
  Closed = "Closed",
}

export enum DEVICE_STATUS {
  Successful = "Successful",
  Failed = "Failed",
}
