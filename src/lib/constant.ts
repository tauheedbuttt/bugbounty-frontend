import React from "react";
import {
  ADMIN_ROLES,
  APPLICATION_TYPE,
  PROGRAM_ROLES,
  REWARD_TYPE,
  ROLE_TYPES,
} from "./enums";
import { Smartphone, Monitor, Webhook, DollarSign, Trophy } from "lucide-react";
import { ROUTE_PATHS } from "@/constants/routes";

export const rolesBasePath = {
  [ROLE_TYPES.Admin]: ROUTE_PATHS.ADMIN_DASHBOARD,
  [ROLE_TYPES.Program]: "/program/reports",
  [ROLE_TYPES.Hacker]: "/programs",
};

export const adminRolesBasePath = {
  [ADMIN_ROLES.Mediator]: ROUTE_PATHS.ADMIN_REPORTS,
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
  [ROLE_TYPES.Admin]: `/${ROLE_TYPES.Admin}/2fa`,
  [ROLE_TYPES.Program]: `/${ROLE_TYPES.Program}/2fa`,
  [ROLE_TYPES.Hacker]: `/${ROLE_TYPES.Hacker}/2fa`,
};

export const rolesBaseAtuhPath = {
  [ROLE_TYPES.Admin]: "/admin/login",
  [ROLE_TYPES.Program]: "/program/login",
  [ROLE_TYPES.Hacker]: "/hacker/login",
};

export const ApplicationTypeIcons = {
  [APPLICATION_TYPE.Web]: Monitor,
  [APPLICATION_TYPE.Mobile]: Smartphone,
  [APPLICATION_TYPE.API]: Webhook,
};

export const RewardTypeIcons = {
  [REWARD_TYPE.Bounty]: DollarSign,
  [REWARD_TYPE.Points]: Trophy,
  [REWARD_TYPE.Mixed]: React.Fragment,
};
