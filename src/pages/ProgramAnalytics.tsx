import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgramSeverityDistribution from "@/components/ProgramSeverityDistribution";
import ProgramTopResearchers from "@/components/ProgramTopResearchers";
import ProgramReportSatusDistribution from "@/components/ProgramReportSatusDistribution";
import ProgramReportsTrend from "@/components/ProgramReportsTrend";
import ProgramProtectedComponent from "@/components/ProgramProtectedComponent";
import { PROGRAM_ROLES } from "@/lib/enums";
export default function ProgramAnalytics() {
  const { programName } = useParams();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Program Analytics
            </h1>
            <p className="text-muted-foreground">{`Analytics dashboard for ${programName}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/${programName}/reports`}></Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reports
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <ProgramProtectedComponent
            allowedRoles={[
              PROGRAM_ROLES.SuperAdmin,
              PROGRAM_ROLES.Accountant,
              PROGRAM_ROLES.ViewerAdmin,
            ]}
          >
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Paid
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </ProgramProtectedComponent>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3d</div>
              <p className="text-xs text-muted-foreground">
                -15% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Researchers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="severity">Severity</TabsTrigger>
            <TabsTrigger value="researchers">Researchers</TabsTrigger>
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
