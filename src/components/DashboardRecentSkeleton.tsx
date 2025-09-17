import { CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const DashboardRecentSkeleton = () => {
  return (
    <CardContent className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
          >
            <div className="space-y-1">
              <Skeleton className={"bg-gray-200 h-[10px] w-[200px]"} />
              <Skeleton className={"bg-gray-200 h-[10px] w-[100px]"} />
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="text-sm">
                  <Skeleton className={"bg-gray-200 h-[10px] w-[30px]"} />
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <Skeleton className={"bg-gray-200 h-[10px] w-[50px]"} />
              </p>
            </div>
          </div>
        ))}
    </CardContent>
  );
};

export default DashboardRecentSkeleton;
