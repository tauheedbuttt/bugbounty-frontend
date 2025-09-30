import { ApplicationTypeIcons } from "@/lib/constant";
import { APPLICATION_TYPE } from "@/lib/enums";

const ProgramPlatforms = ({
  applicationTypes,
}: {
  applicationTypes: APPLICATION_TYPE[];
}) => {
  return (
    <div className="flex flex-col gap-1">
      {applicationTypes.map((applicationType) => {
        const Icon = ApplicationTypeIcons[applicationType];
        return (
          <div
            key={applicationType}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            <Icon className="h-3 w-3" />
            <span>{applicationType}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramPlatforms;
