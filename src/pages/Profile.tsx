import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Share,
  Edit,
  Trophy,
  FileText,
  Gift,
  Star,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/hooks/apis/use-auth";
import { useAuthStore } from "@/stores/auth";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { formatNumber } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";

const activityData = [
  { month: "Aug", value: 0 },
  { month: "Sep", value: 1 },
  { month: "Oct", value: 2 },
  { month: "Nov", value: 1 },
  { month: "Dec", value: 3 },
  { month: "Jan", value: 2 },
  { month: "Feb", value: 4 },
  { month: "Mar", value: 3 },
  { month: "Apr", value: 5 },
  { month: "May", value: 4 },
  { month: "Jun", value: 2 },
];

export default function Profile() {
  const { t } = useTranslation();
  const { role } = useAuthStore();
  const { useGetProfile } = useAuth(role);

  const { data } = useGetProfile({});

  const profile = data?.data;

  const profileStats = [
    {
      icon: Trophy,
      label: t.common.buttons.rank,
      value: profile?.stats?.rank ?? 0,
      color: "text-green-500",
    },
    {
      icon: FileText,
      label: t.common.buttons.reports,
      value: formatNumber(profile?.stats?.reports) ?? 0,
      color: "text-purple-500",
    },
    {
      icon: Gift,
      label: t.common.buttons.bounties,
      value: `USD ${formatNumber(profile?.stats?.bounties) ?? 0}`,
      color: "text-blue-500",
    },
    {
      icon: Star,
      label: t.common.buttons.points,
      value: formatNumber(profile?.stats?.points) ?? 0,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {t.common.buttons.profile}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  {profile?.image && (
                    <AvatarImage src={profile?.image ?? "/placeholder.svg"} />
                  )}
                  <AvatarFallback className="text-2xl">
                    {profile?.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <h2 className="text-xl font-semibold">{profile?.username}</h2>
                  {profile?.isBlueBadge && (
                    <InstagramBlueBadge size={18} className="inline" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.common.buttons.joined}
                  {" " + dayjs(profile?.createdAt).format("DD MMM YYYY")}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    {t.common.buttons.share}
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={ROUTE_PATHS.SETTINGS}>
                      <Edit className="h-4 w-4 mr-2" />
                      {t.common.buttons.edit}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <div className="grid grid-cols-2 gap-4">
              {profileStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <stat.icon
                      className={`h-6 w-6 mx-auto mb-2 ${stat.color}`}
                    />
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {t.common.buttons.statistics}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t.common.buttons.activity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
