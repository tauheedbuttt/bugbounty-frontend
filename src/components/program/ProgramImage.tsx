import { cn } from "@/lib/utils";
import React from "react";

interface ProgramImageProps {
  image: string;
  name: string;
  className?: string;
}

const ProgramImage = ({ image, name, className }: ProgramImageProps) => {
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-primary text-lg",
        image ? "" : "bg-primary/10 ",
        className
      )}
    >
      {image ? (
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={image}
          alt={name}
        />
      ) : (
        name.slice(0, 1)
      )}
    </div>
  );
};

export default ProgramImage;
