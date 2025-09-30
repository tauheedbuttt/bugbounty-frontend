import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useReport } from "@/hooks/apis/use-report";
import { ReportByIdResponseData } from "@/types/report";
import { Badge } from "./ui/badge";
import dayjs from "dayjs";
import { lastRequest } from "@/utils/reportUtils";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsRequestMediator = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { t } = useTranslation();
  const { useRequestMediator } = useReport();
  const { mutate: requestMediator, isPending } = useRequestMediator;

  const mediator = report?.mediator;
  const requested = report?.requestedMediator;
  const lastUpdated = report?.requestedMediatorDate;
  // ??
  // dayjs()
  //   .set("hours", dayjs().get("hours") - 1)
  //   .toISOString();
  const selected = requested || mediator;
  const requestLabel = selected
    ? t.common.buttons.requested
    : t.common.buttons.request;
  const selectLabel = selected
    ? t.common.buttons.selected
    : t.common.buttons.select;

  const handleRequestMediator = () => {
    requestMediator({ id: report._id });
  };

  return (
    <div className="space-y-6">
      {/* Request Mediator Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {requestLabel} {t.common.buttons.mediator}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Requested To */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {selectLabel} {t.common.buttons.mediator}
              </label>
              {mediator && (
                <Badge variant={"secondary"} className="ml-3">
                  {mediator?.username ??
                    `${mediator?.firstName} ${mediator?.lastName}`}
                </Badge>
              )}
              {requested && (
                <Badge variant={"secondary"} className="ml-3">
                  {t.common.buttons.pending_request}
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
                  ? t.common.buttons.you_cant_request_again_within
                  : undefined
              }
              titlePosition="bottom"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {t.common.buttons.request_mediator}{" "}
              {requested ? `(${t.common.buttons.again})` : ""}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetailsRequestMediator;
