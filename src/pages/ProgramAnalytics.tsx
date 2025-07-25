import ProgramAnalyticsStats from "@/components/ProgramAnalyticsStats";
import ProgramReportSatusDistribution from "@/components/ProgramReportSatusDistribution";
import ProgramReportsTrend from "@/components/ProgramReportsTrend";
import ProgramSeverityDistribution from "@/components/ProgramSeverityDistribution";
import ProgramTopResearchers from "@/components/ProgramTopResearchers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/use-translation";
import { useAuthStore } from "@/stores/auth";

export default function ProgramAnalytics() {
  const { t } = useTranslation();
  const { programName } = useAuthStore();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t.common.buttons.program_analytics}
            </h1>
            <p className="text-muted-foreground">{`Analytics dashboard for ${programName}`}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <ProgramAnalyticsStats />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              {t.common.buttons.overview}
            </TabsTrigger>
            <TabsTrigger value="severity">
              {t.common.buttons.severity}
            </TabsTrigger>
            <TabsTrigger value="researchers">
              {t.common.buttons.researchers}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ProgramReportsTrend />
              <ProgramReportSatusDistribution />
            </div>
          </TabsContent>

          {/* --- SEVERITY - now FULL WIDTH and responsive --- */}
          <TabsContent value="severity" className="space-y-4">
            <ProgramSeverityDistribution />
          </TabsContent>

          {/* --- RESEARCHERS - link names to profile, remove money --- */}
          <TabsContent value="researchers" className="space-y-4">
            <ProgramTopResearchers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
