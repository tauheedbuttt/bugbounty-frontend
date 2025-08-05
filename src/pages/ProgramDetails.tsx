import ProgramDetailsUI from "@/components/ProgramDetailsUI";
import { ROUTE_PATHS } from "@/constants/routes";
import { useLayoutEffect } from "react";

export default function ProgramDetails() {
  // Force dark mode for this page, even on reload
  useLayoutEffect(() => {
    document.documentElement.classList.add("dark");
    // Set a flag so ThemeProvider knows to skip
    document.documentElement.setAttribute("data-force-dark", "true");
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-force-dark");
    };
  }, []);

  return <ProgramDetailsUI backRoute={ROUTE_PATHS.LANDING.PROGRAMS} />;
}
