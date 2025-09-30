import React from "react";
import {
  ADMIN_ROLES,
  APPLICATION_TYPE,
  PROGRAM_ROLES,
  REWARD_TYPE,
  ROLE_TYPES,
} from "./enums";
import {
  Smartphone,
  Monitor,
  Webhook,
  DollarSign,
  Trophy,
  Gift,
} from "lucide-react";
import { ROUTE_PATHS } from "@/constants/routes";

export const rolesBasePath = {
  [ROLE_TYPES.Admin]: ROUTE_PATHS.ADMIN_DASHBOARD,
  [ROLE_TYPES.Program]: ROUTE_PATHS.PROGRAM_REPORTS,
  [ROLE_TYPES.Hacker]: ROUTE_PATHS.DASHBOARD,
};

export const adminRolesBasePath = {
  [ADMIN_ROLES.Mediator]: ROUTE_PATHS.ADMIN_MEDIATOR,
  [ADMIN_ROLES.ReaderAdmin]: ROUTE_PATHS.ADMIN_DASHBOARD,
  [ADMIN_ROLES.SuperAdmin]: ROUTE_PATHS.ADMIN_DASHBOARD,
};

export const programRolesBasePath = {
  [PROGRAM_ROLES.SuperAdmin]: ROUTE_PATHS.PROGRAM_REPORTS,
  [PROGRAM_ROLES.ViewerAdmin]: ROUTE_PATHS.PROGRAM_REPORTS,
  [PROGRAM_ROLES.Triager]: ROUTE_PATHS.PROGRAM_REPORTS,
  [PROGRAM_ROLES.Accountant]: ROUTE_PATHS.PROGRAM_PAYMENTS,
};

export const rolesBase2FaPath = {
  [ROLE_TYPES.Admin]: ROUTE_PATHS.MFA.replace(":type", ROLE_TYPES.Admin),
  [ROLE_TYPES.Program]: ROUTE_PATHS.MFA.replace(":type", ROLE_TYPES.Program),
  [ROLE_TYPES.Hacker]: ROUTE_PATHS.MFA.replace(":type", "Researcher"),
};

export const rolesBaseAtuhPath = {
  [ROLE_TYPES.Admin]: ROUTE_PATHS.ADMIN_LOGIN,
  [ROLE_TYPES.Program]: ROUTE_PATHS.PROGRAM_LOGIN,
  [ROLE_TYPES.Hacker]: ROUTE_PATHS.HACKER_LOGIN,
};

export const ApplicationTypeIcons = {
  [APPLICATION_TYPE.Web]: Monitor,
  [APPLICATION_TYPE.Mobile]: Smartphone,
  [APPLICATION_TYPE.API]: Webhook,
};

export const RewardTypeIcons = {
  [REWARD_TYPE.BountyPoints]: DollarSign,
  [REWARD_TYPE.Points]: Trophy,
  [REWARD_TYPE.SwagPoints]: Gift,
  [REWARD_TYPE.SwagBountyPoints]: DollarSign,
};
