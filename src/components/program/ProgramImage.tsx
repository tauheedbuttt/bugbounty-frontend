import React from "react";

interface ProgramImageProps {
  image: string;
  name: string;
}

const ProgramImage = ({ image, name }: ProgramImageProps) => {
  return (
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-primary text-lg">
      {image ? <img src={image} alt={name} /> : name.slice(0, 1)}
    </div>
  );
};

export default ProgramImage;
