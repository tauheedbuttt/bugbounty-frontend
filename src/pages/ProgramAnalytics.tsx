import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertTriangle, Shield, DollarSign, Clock, Users } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function ProgramAnalytics() {
  const {
    programName
  } = useParams();
  const severityData = [{
    name: "Critical",
    value: 2,
    color: "#ef4444"
  }, {
    name: "High",
    value: 5,
    color: "#f97316"
  }, {
    name: "Medium",
    value: 12,
    color: "#eab308"
  }, {
    name: "Low",
    value: 8,
    color: "#22c55e"
  }];
  const monthlyReports = [{
    month: "Jan",
    reports: 15,
    resolved: 12
  }, {
    month: "Feb",
    reports: 22,
    resolved: 18
  }, {
    month: "Mar",
    reports: 18,
    resolved: 16
  }, {
    month: "Apr",
    reports: 28,
    resolved: 24
  }, {
    month: "May",
    reports: 35,
    resolved: 30
  }, {
    month: "Jun",
    reports: 27,
    resolved: 20
  }];
  const statusData = [
    {
      name: "New",
      value: 8,
      color: "#ef4444" // Tailwind red-500
    },
    {
      name: "Ongoing",
      value: 12,
      color: "#f59e42" // Tailwind amber-400
    },
    {
      name: "Fixed",
      value: 45,
      color: "#22c55e" // Tailwind green-500
    },
    {
      name: "Duplicate",
      value: 6,
      color: "#38bdf8" // Tailwind sky-400
    },
    {
      name: "Not Applicable",
      value: 4,
      color: "#6b7280" // Tailwind gray-500
    }
  ];
  // Updated researchers list: Remove 'rewards'
  const topResearchers = [{
    name: "john_hacker",
    reports: 12
  }, {
    name: "security_pro",
    reports: 8
  }, {
    name: "bug_finder",
    reports: 6
  }, {
    name: "ethical_hacker",
    reports: 5
  }];
  const chartConfig = {
    reports: {
      label: "Reports",
      color: "hsl(var(--primary))"
    },
    resolved: {
      label: "Resolved",
      color: "hsl(var(--muted))"
    }
  };
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Program Analytics</h1>
            <p className="text-muted-foreground">{`Analytics dashboard for ${programName}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/${programName}/reports`}>
              
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
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
              <Card className="w-full max-w-full overflow-x-auto">
                <CardHeader>
                  <CardTitle>Monthly Reports Trend</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="w-full min-w-[270px] md:min-w-[350px] xl:min-w-[390px]">
                    <ChartContainer config={chartConfig} className="h-[260px] sm:h-[300px]">
                      <LineChart data={monthlyReports}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="reports" stroke="var(--color-reports)" strokeWidth={2} />
                        <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full max-w-full overflow-x-auto">
                <CardHeader>
                  <CardTitle>Report Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="w-full min-w-[270px] md:min-w-[350px] xl:min-w-[390px]">
                    <ChartContainer config={chartConfig} className="h-[260px] sm:h-[300px]">
                      <BarChart data={statusData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value">
                          {statusData.map((entry, idx) => (
                            <Cell key={`cell-status-${idx}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-4 justify-center">
                      {statusData.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-2 text-xs">
                          <span
                            className="inline-block w-3 h-3 rounded"
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          {entry.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- SEVERITY - now FULL WIDTH and responsive --- */}
          <TabsContent value="severity" className="space-y-4">
            <Card className="w-full max-w-full overflow-x-auto">
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full flex justify-center items-center min-w-0">
                  <ChartContainer config={chartConfig} className="h-[300px] xs:h-[400px] w-full min-w-0 max-w-full flex-1">
                    <PieChart width={undefined} height={undefined}>
                      <Pie data={severityData} cx="50%" cy="50%" outerRadius="90%" dataKey="value" label={({
                      name,
                      value
                    }) => `${name}: ${value}`} isAnimationActive>
                        {severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- RESEARCHERS - link names to profile, remove money --- */}
          <TabsContent value="researchers" className="space-y-4">
            <Card className="w-full xl:max-w-3xl mx-auto overflow-x-auto">
              <CardHeader>
                <CardTitle>Top Researchers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topResearchers.map((researcher, index) => <div key={researcher.name} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <div>
                          {/* Researcher's name as a link (remove underscores from slug for cleaner handle) */}
                          <Link to={`/@${researcher.name.replace(/_/g, "")}/`} className="font-medium text-primary underline hover:text-primary/80 transition-colors">
                            {researcher.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {researcher.reports} reports
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}
