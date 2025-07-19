import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Bug, Loader2, Download } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useReport } from "@/hooks/apis/use-report";
import ReportDetailsComments from "@/components/ReportDetailsComments";
import ReportDetailsManagement from "@/components/ReportDetailsManagement";
import ReportDetailsBountyDecision from "@/components/ReportDetailsBountyDecision";
import { useAuthStore } from "@/stores/auth";
import { ADMIN_ROLES, ROLE_TYPES } from "@/lib/enums";
import ReportDetailsInformation from "@/components/RerportDetailsInformation";
import ReportDetailsAssignMediator from "@/components/ReportDetailsAssignMediator";
import { ROUTE_PATHS } from "@/constants/routes";
import ReportDetailsRequestMediator from "@/components/ReportDetailsRequestMediator";
import ReportDetailsMediatorNotification from "@/components/ReportDetailsMediatorNotification";
import ReportDetailsAttachment from "@/components/ReportDetailsAttachment";
import AdminProtectedComponent from "@/components/AdminProtectedComponent";

export default function ReportDetails() {
  const { role } = useAuthStore();
  const navigate = useNavigate();
  const { programName, reportId } = useParams();

  const { useGetReportById } = useReport();

  const { data, isFetching, isLoading } = useGetReportById({ id: reportId });
  const report = data?.data?.report;

  const backLinks = {
    [ROLE_TYPES.Admin]: ROUTE_PATHS.ADMIN_REPORTS,
    [ROLE_TYPES.Program]: ROUTE_PATHS.PROGRAM_REPORTS.replace(
      "program",
      programName
    ),
    [ROLE_TYPES.Hacker]: ROUTE_PATHS.REPORTS,
  };

  if (!report && !isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Report Not Found
          </h1>
          <Button onClick={() => navigate(backLinks[role])}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="h-10 w-10  text-muted-foreground animate-spin" />
      </div>
    );
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to={backLinks[role]}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {report?.name}
            </h1>
            <p className="text-muted-foreground">Report ID: {report?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vulnerability Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Target Domain</p>
                      <a
                        href={
                          report?.domain?.startsWith("http")
                            ? report?.domain
                            : `https://${report?.domain}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground underline break-all max-w-[70%] inline-block truncate"
                        title={report?.domain}
                      >
                        {report?.domain}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bug className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Vulnerability Type</p>
                      <p className="text-sm text-muted-foreground">
                        {report?.type}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Details */}
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: report?.summary,
                    }}
                  />
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Steps to Reproduce</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: report?.proofOfConcept,
                      }}
                    />
                  </ol>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Impact</h4>
                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: report?.impact,
                    }}
                  />
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: report?.remediation,
                      }}
                    />
                  </ul>
                </div>
              </CardContent>
            </Card>

            <ReportDetailsAttachment report={report} />
            <ReportDetailsComments report={report} />
          </div>

          {/* Sidebar */}
          {role === ROLE_TYPES.Program && (
            <div className="space-y-6">
              <ReportDetailsMediatorNotification report={report} />
              <ReportDetailsManagement report={report} />
              <ReportDetailsBountyDecision report={report} />
            </div>
          )}
          {role === ROLE_TYPES.Admin && (
            <div className="space-y-6">
              <ReportDetailsInformation report={report} />
              <ReportDetailsMediatorNotification report={report} />

              <AdminProtectedComponent
                allowedRoles={[ADMIN_ROLES.ReaderAdmin, ADMIN_ROLES.SuperAdmin]}
                disabled
              >
                <ReportDetailsAssignMediator report={report} />
              </AdminProtectedComponent>
              <AdminProtectedComponent allowedRoles={[ADMIN_ROLES.Mediator]}>
                <ReportDetailsBountyDecision report={report} />
              </AdminProtectedComponent>
            </div>
          )}
          {role === ROLE_TYPES.Hacker && (
            <div className="space-y-6">
              <ReportDetailsInformation report={report} />
              <ReportDetailsRequestMediator report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
