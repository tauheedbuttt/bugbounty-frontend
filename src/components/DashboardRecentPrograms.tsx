import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronRight } from "lucide-react";
import { useProgram } from "@/hooks/apis/use-program";
import { useProgramStore } from "@/stores/program";
import { HackerProgramsResponseData } from "@/types/hacker/program";
import { programTimeLeft } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import DashboardRecentSkeleton from "./DashboardRecentSkeleton";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";

const DashboardRecentPrograms = () => {
  const { programs } = useProgramStore();

  const { useGetHackerPrograms } = useProgram();

  const { isFetching } = useGetHackerPrograms({
    params: {
      limit: 3,
      page: 1,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Programs</CardTitle>
        <Link to={ROUTE_PATHS.PROGRAMS}>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </CardHeader>
      {isFetching && <DashboardRecentSkeleton />}
      <CardContent className="space-y-4">
        {(programs as HackerProgramsResponseData[]).map((program, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
          >
            <div className="space-y-1">
              <p className="font-medium">{program.name}</p>
              <p className="text-sm text-muted-foreground">{program.company}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="text-sm">
                  {programTimeLeft(program.updatedAt)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {program.participantsCount} participants
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentPrograms;
