import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HackerProgramById } from "@/types/hacker/program";
import ProgramPlatforms from "../ProgramPlatforms";
import ProgramImage from "./ProgramImage";

interface ProgramHeaderProps {
  program: HackerProgramById;
}

export default function ProgramHeader({ program }: ProgramHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <ProgramImage
            className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-primary text-2xl"
            image={program.profileImage}
            name={program.name}
          />
          <div className="flex-1">
            <CardTitle className="text-3xl">{program.name}</CardTitle>
            <a
              href={
                program.company?.startsWith("http")
                  ? program.company
                  : `https://${program.company}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-muted-foreground mt-2 underline break-all w-[80%] inline-block truncate"
              title={program.company}
            >
              {program.company}
            </a>
            <div className="flex items-center gap-4 mt-4">
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
