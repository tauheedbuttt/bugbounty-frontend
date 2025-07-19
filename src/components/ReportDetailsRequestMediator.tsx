import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useReport } from "@/hooks/apis/use-report";
import { ReportByIdResponseData } from "@/types/report";
import { Badge } from "./ui/badge";
import dayjs from "dayjs";
import { lastRequest } from "@/utils/reportUtils";

const ReportDetailsRequestMediator = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { useRequestMediator } = useReport();
  const { mutate: requestMediator, isPending } = useRequestMediator;

  const mediator = report?.mediator;
  const requested = report?.requestedMediator;
  const lastUpdated = report?.requestedMediatorDate;
  // ??
  // dayjs()
  //   .set("hours", dayjs().get("hours") - 1)
  //   .toISOString();
  const selected = requested || mediator ? "ed" : "";

  const handleRequestMediator = () => {
    requestMediator({ id: report._id });
  };

  return (
    <div className="space-y-6">
      {/* Request Mediator Card */}
      <Card>
        <CardHeader>
          <CardTitle>Request{selected} Mediator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Requested To */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Select{selected} Mediator
              </label>
              {mediator && (
                <Badge variant={"secondary"} className="ml-3">
                  {mediator?.username}
                </Badge>
              )}
              {requested && (
                <Badge variant={"secondary"} className="ml-3">
                  Pending Request
                </Badge>
              )}
            </div>
          </div>

          {!mediator && (
            <Button
              isLoading={isPending}
              disabled={isPending || (lastUpdated && lastRequest(lastUpdated))}
              className="w-full"
              onClick={handleRequestMediator}
              title={
                lastUpdated && lastRequest(lastUpdated)
                  ? "You can't request again within 2 hours of the last request."
                  : undefined
              }
              titlePosition="bottom"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Request Mediator {requested ? "(Again)" : ""}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetailsRequestMediator;
