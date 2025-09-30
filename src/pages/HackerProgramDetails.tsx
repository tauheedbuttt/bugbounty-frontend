import ProgramDetailsUI from "@/components/ProgramDetailsUI";
import { ROUTE_PATHS } from "@/constants/routes";

export default function HackerProgramDetails() {
  return <ProgramDetailsUI backRoute={ROUTE_PATHS.HACKER_PROGRAMS} />;
}
