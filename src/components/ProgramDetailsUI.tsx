import AssetsSection from "@/components/program/AssetsSection";
import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/ProgramSidebar";
import RewardStructure from "@/components/program/RewardStructure";
import RulesSection from "@/components/program/RulesSection";
import ScopeSection from "@/components/program/ScopeSection";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routes";
import { useProgram } from "@/hooks/apis/use-program";
import { useToken } from "@/hooks/use-token";
import { useTranslation } from "@/hooks/use-translation";
import { LOCAL_STORAGE, PROGRAM_DETAILS_TYPE } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProgramDetailsUI({ backRoute }: { backRoute: string }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();

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
    const submitReportPath = ROUTE_PATHS.SUBMIT_REPORT.replace(":id", id || "");
    const path = !token
      ? ROUTE_PATHS.HACKER_LOGIN
      : ROUTE_PATHS.SUBMIT_REPORT.replace(":id", id);
    navigate(path, { state: { program } });
    localStorage.setItem(
      LOCAL_STORAGE.REPORT_AFTER_AUTH,
      JSON.stringify({
        program,
        from: submitReportPath,
      })
    );
  };

  if (!program && !isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t.common.buttons.program_not_found}
          </h1>
          <Button onClick={() => navigate(backRoute)}>
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
          <Button variant="ghost" onClick={() => navigate(backRoute)}>
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
