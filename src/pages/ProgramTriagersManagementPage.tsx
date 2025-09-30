import ProgramTriagersManagement from "@/components/ProgramTriagersManagement";
import { useTranslation } from "@/hooks/use-translation";

export default function ProgramTriagersManagementPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {t.common.buttons.team_management}
        </h1>
        <ProgramTriagersManagement />
      </div>
    </div>
  );
}
