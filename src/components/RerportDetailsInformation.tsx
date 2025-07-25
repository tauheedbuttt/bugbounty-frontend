import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";
import dayjs from "dayjs";
import { getSeverityColor } from "@/utils/programUtils";
import { ReportByIdResponseData } from "@/types/report";
import { getStatusColor } from "@/utils/reportUtils";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsInformation = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { t } = useTranslation();
  const { severity, status } = {
    severity: report?.severity ?? "",
    status: report?.status ?? "",
  };

  return (
    <div className="space-y-6">
      {/* Report Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t.forms.labels.report_information}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Researcher */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {t.common.buttons.researcher}: {report?.researcher?.username}
            </span>
          </div>
          {/* Submitted */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {t.common.buttons.submitted}:{" "}
              {dayjs(report?.createdAt).format("YYYY-MM-DD")}
            </span>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {t.forms.labels.status}
              </label>
              <Badge variant={getStatusColor(status)} className="ml-3">
                {status}
              </Badge>
            </div>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {t.common.buttons.severity}
              </label>
              <Badge className={`ml-3 ${getSeverityColor(severity)}`}>
                {severity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetailsInformation;
