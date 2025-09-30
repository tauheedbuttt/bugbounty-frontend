export enum COOKIES {
  TOKEN = "auth_token",
}

export enum LOCAL_STORAGE {
  ROLE = "role",
  ADMIN_ROLE = "adminRole",
  REPORT_AFTER_AUTH = "report-after-auth",
  PROGRAM_ROLE = "programRole",
  PROGRAM_NAME = "programName",
  PROGRAM_LOGO = "programLogo",
  PROGRAM = "program",
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
  ViewerAdmin = "Viewer Admin",
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
  Points = "Points",
  BountyPoints = "Points + Bounty",
  SwagPoints = "Points + Swag",
  SwagBountyPoints = "Points + Bounty + Swag",
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
  SQLInjection = "SQL Injection",
  XSS = "Cross-Site Scripting (XSS)",
  RemoteFileInclusion = "Remote File Inclusion",
  LocalFileInclusion = "Local File Inclusion",
  PathTraversal = "Path Traversal",
  Clickjacking = "Clickjacking / UI Redressing",
  CSRF = "Cross-Site Request Forgery (CSRF)",
  SSRF = "Server-Side Request Forgery (SSRF)",
  IDOR = "Insecure Direct Object Reference (IDOR)",
  OpenRedirect = "Open Redirect",
  HTTPRequestSmuggling = "HTTP Request Smuggling",
  HTTPResponseSplitting = "HTTP Response Splitting",
  LDAPInjection = "LDAP Injection",
  OSCommandInjection = "OS Command Injection",
  XXEInjection = "XML External Entity (XXE) Injection",
  InsecureDeserialization = "Deserialization of Untrusted Data",
  ForcedBrowsing = "Forced Browsing",
  CachePoisoning = "Cache Poisoning",
  ClientSideEnforcement = "Client-Side Enforcement of Server-Side Security",
  DirectoryListingExposure = "Information Exposure Through Directory Listing",
  UIMisrepresentation = "User Interface Misrepresentation",
  SessionFixation = "Session Fixation",
  InsufficientSessionExpiration = "Insufficient Session Expiration",
  UnverifiedPasswordChange = "Unverified Password Change",
  WeakPasswordRecovery = "Weak Password Recovery Mechanism",
  SensitiveCacheUse = "Use of Web Browser Cache Containing Sensitive Information",
  URLEncodingIssues = "Improper Handling of URL Encoding",
  CRLFInjection = "CRLF Injection",
  XMLInjection = "XML Injection",
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
  Triaged = "Triagging",
  Resolved = "Resolved",
  Closed = "Closed",
  Needs_More_Information = "Needs more information",
}

export enum DEVICE_STATUS {
  Successful = "Successful",
  Failed = "Failed",
}
