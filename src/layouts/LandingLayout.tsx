import { Routes, Route } from "react-router-dom";
import { landingRoutes } from "@/router/LandingRoutes";
import LandingNavigation from "@/components/LandingNavigation";
import LandingFooter from "@/components/LandingFooter";

export const LandingLayout = () => {
  return (
    <Routes>
      {landingRoutes.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={
            <div className="min-h-screen bg-black text-white">
              <LandingNavigation />
              {item.element}
              <LandingFooter />
            </div>
          }
        />
      ))}
    </Routes>
  );
};
