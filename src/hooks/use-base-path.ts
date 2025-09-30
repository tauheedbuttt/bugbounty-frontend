import {
  adminRolesBasePath,
  programRolesBasePath,
  rolesBasePath,
} from "@/lib/constant";
import useLocalStorage from "./use-local-storage";
import { ADMIN_ROLES, PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";

export const getBasePath = (
  role: ROLE_TYPES,
  adminRole?: ADMIN_ROLES,
  programRole?: PROGRAM_ROLES
) => {
  let path = rolesBasePath[role]; // This uses 'role' from outer scope
  if (adminRole) path = adminRolesBasePath[adminRole]; // This correctly updates path
  if (programRole) path = programRolesBasePath[programRole]; // This correctly updates path
  console.log({ path });
  return path;
};

const useBasePath = () => {
  const { role, adminRole } = useLocalStorage();

  return getBasePath(role, adminRole);
};

export default useBasePath;
