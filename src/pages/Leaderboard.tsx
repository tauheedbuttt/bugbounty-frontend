import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useLeaderboard } from "@/hooks/apis/use-leaderboard";

export default function Leaderboard() {
  const { useGetLeaderboard } = useLeaderboard();
  const { data, isFetching } = useGetLeaderboard({
    params: {
      page: 1,
      limit: 0,
    },
  });

  const leaderboard = [...(data?.data?.items ?? [])];

  const topResearchers = leaderboard.slice(0, 3);
  const leaderboardData = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">
              Researchers ranking across BugBounty
            </p>
          </div>
          <div className="flex gap-2"></div>
        </div>

        {/* Top 3 Researchers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topResearchers.map((researcher, index) => (
            <div key={researcher.user._id} className="p-6 text-center">
              <div className="mb-4">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={researcher.user.image} />
                  <AvatarFallback>
                    {researcher.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">
                {researcher.user.username}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-4 w-4 text-gray-500 fill-current" />
                <span className="font-bold text-xl text-gray-800">
                  {researcher.points.toLocaleString()}
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-gray-200 text-gray-700 text-lg px-3 py-1"
              >
                #{researcher.rank}
              </Badge>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        {leaderboardData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((researcher) => (
                  <div
                    key={researcher.user._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold">
                        {researcher.rank}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={researcher.user.image} />
                        <AvatarFallback>
                          {researcher.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {researcher.user.username}
                          </span>
                          {researcher.user.isBlueBadge && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1.5 py-0.5"
                            >
                              ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">
                        {researcher.points.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
