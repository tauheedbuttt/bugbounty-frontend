import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import ProgramHeader from "@/components/program/ProgramHeader";
import RewardStructure from "@/components/program/RewardStructure";
import AssetsSection from "@/components/program/AssetsSection";
import ScopeSection from "@/components/program/ScopeSection";
import RulesSection from "@/components/program/RulesSection";
import ProgramSidebar from "@/components/program/ProgramSidebar";
import { useProgram } from "@/hooks/apis/use-program";
import { PROGRAM_DETAILS_TYPE } from "@/lib/enums";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTE_PATHS } from "@/constants/routes";

export default function ProgramDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { useGetHackerProgramById } = useProgram();
  const { data, isFetching } = useGetHackerProgramById({ id });

  const program = data?.data?.program;

  const rules = program?.details.filter(
    (item) => item.type === PROGRAM_DETAILS_TYPE.Guidelines
  );
  const outOfScope = program?.details.filter(
    (item) => item.type === PROGRAM_DETAILS_TYPE.OutOfScope
  );
  const scope = program?.details.filter(
    (item) => item.type === PROGRAM_DETAILS_TYPE.Scope
  );

  const handleSubmitReport = () => {
    const path = ROUTE_PATHS.SUBMIT_REPORT.replace(":id", id);
    navigate(path, { state: { program } });
  };

  if (!program && !isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t.common.buttons.program_not_found}
          </h1>
          <Button onClick={() => navigate(ROUTE_PATHS.HACKER_PROGRAMS)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.buttons.back_to_programs}
          </Button>
        </div>
      </div>
    );
  }

  return isFetching ? (
    <Loader2></Loader2>
  ) : (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTE_PATHS.HACKER_PROGRAMS)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.buttons.back_to_programs}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ProgramHeader program={program} />

            {program.bounties && (
              <RewardStructure
                rewardType={program.rewardType}
                bounties={program.bounties}
              />
            )}

            <AssetsSection assets={program.assets} />

            <ScopeSection scope={scope} outOfScope={outOfScope} />

            <RulesSection rules={rules} />
          </div>

          {/* Sidebar */}
          <ProgramSidebar
            rules={rules}
            program={program}
            onSubmitReport={handleSubmitReport}
          />
        </div>
      </div>
    </div>
  );
}
