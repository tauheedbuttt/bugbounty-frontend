import {
  ADMIN_ROLES,
  LOCAL_STORAGE,
  PROGRAM_ROLES,
  ROLE_TYPES,
} from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";

const useLocalStorage = () => {
  const {
    role: stateRole,
    adminRole: stateAdminRole,
    programRole: stateProgramRole,
    program: stateProgram,
    programName: stateProgramName,
    programLogo: stateProgramLogo,
  } = useAuthStore();
  const storedRole = localStorage.getItem(LOCAL_STORAGE.ROLE) as ROLE_TYPES;
  const storedAdminRole = localStorage.getItem(
    LOCAL_STORAGE.ADMIN_ROLE
  ) as ADMIN_ROLES;
  const storedProgramRole = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_ROLE
  ) as PROGRAM_ROLES;
  const storedProgram = localStorage.getItem(LOCAL_STORAGE.PROGRAM) as string;
  const storedProgramName = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_NAME
  ) as string;
  const storedProgramLogo = localStorage.getItem(
    LOCAL_STORAGE.PROGRAM_LOGO
  ) as string;

  let role = stateRole ?? storedRole;
  let adminRole = stateAdminRole ?? storedAdminRole;
  let programRole = stateProgramRole ?? storedProgramRole;
  let program = stateProgram ?? storedProgram;
  let programName = stateProgramName ?? storedProgramName;
  let programLogo = stateProgramLogo ?? storedProgramLogo;

  return {
    role,
    adminRole,
    programRole,
    program,
    programName,
    programLogo,
  };
};

export default useLocalStorage;
