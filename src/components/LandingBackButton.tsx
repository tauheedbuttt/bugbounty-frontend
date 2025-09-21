import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const LandingBackButton = () => {
  const { t, currentLanguage } = useTranslation();
  const Arrow = currentLanguage === "ar" ? ArrowRight : ArrowLeft;
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link to="/">
        <Button
          variant="ghost"
          size="sm"
          className="text-white p-0 group hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-white focus:text-white"
        >
          <Arrow className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          {t.contactUs.back}
        </Button>
      </Link>
    </div>
  );
};

export default LandingBackButton;
