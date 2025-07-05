import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield } from "lucide-react";
import { getSeverityColor } from "@/utils/programUtils";
import { HackerProgramById } from "@/types/hacker/program";
import ProgramImage from "./ProgramImage";
import ProgramPlatforms from "../ProgramPlatforms";

interface ProgramHeaderProps {
  program: HackerProgramById;
}

export default function ProgramHeader({ program }: ProgramHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-2xl">
            <ProgramImage image={program.image} name={program.name} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-3xl">{program.name}</CardTitle>
            <p className="text-lg text-muted-foreground mt-2">
              {program.company}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Badge className={getSeverityColor(program.severity)}>
                <Shield className="h-3 w-3 mr-1" />
                {program.severity}
              </Badge>
              <ProgramPlatforms applicationTypes={program.applicationTypes} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: program.description }}
        />
      </CardContent>
    </Card>
  );
}
