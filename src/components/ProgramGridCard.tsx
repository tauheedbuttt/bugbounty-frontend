import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTE_PATHS } from "@/constants/routes";
import { formatNumber, getProgramReward, programTimeLeft } from "@/lib/utils";
import { HackerProgramsResponseData } from "@/types/hacker/program";
import { getSeverityColor } from "@/utils/programUtils";
import { Clock, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgramImage from "./program/ProgramImage";
import ProgramPlatforms from "./ProgramPlatforms";

const ProgramGridCard = ({
  program,
}: {
  program: HackerProgramsResponseData;
}) => {
  const navigate = useNavigate();

  const handleProgramClick = (program: HackerProgramsResponseData) => {
    console.log("Program clicked:", program);
    const path = ROUTE_PATHS.HACKER_PROGRAM_DETAILS.replace(
      ":id",
      program.slug
    );
    navigate(path);
  };

  const reward = getProgramReward(program.prices);
  return (
    <Card
      key={program._id}
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95"
      onClick={() => handleProgramClick(program)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <ProgramImage image={program.profileImage} name={program.name} />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {program.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {program.company}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">{reward}</span>
        </div>

        <div className="flex items-center justify-between">
          <ProgramPlatforms applicationTypes={program.applicationTypes} />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{formatNumber(program.participantsCount ?? 0)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{programTimeLeft(program.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramGridCard;
