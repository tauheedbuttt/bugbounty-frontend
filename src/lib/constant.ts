import React from "react";
import { APPLICATION_TYPE, REWARD_TYPE, ROLE_TYPES } from "./enums";
import { Smartphone, Monitor, Webhook, DollarSign, Trophy } from "lucide-react";

export const rolesBasePath = {
  [ROLE_TYPES.Admin]: "/admin",
  [ROLE_TYPES.Program]: "/:programName/reports",
  [ROLE_TYPES.Hacker]: "/programs",
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
