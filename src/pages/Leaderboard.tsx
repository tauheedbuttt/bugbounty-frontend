import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLeaderboard } from "@/hooks/apis/use-leaderboard";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const { t } = useTranslation();

  const { useGetLeaderboard } = useLeaderboard();
  const { data, isFetching } = useGetLeaderboard({
    params: {
      page: 1,
      limit: 0,
    },
  });

  const topResearchers = [...(data?.data?.items ?? [])];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.common.buttons.back}
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-light text-white mb-4">
            {t.common.buttons.leaderboard}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.common.buttons.top_researchers_safer_world}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Outer rectangle with #1C1C1C background */}
        <div
          className="rounded-3xl p-8"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          {/* Researchers List */}
          <div className="space-y-2">
            {topResearchers.map((researcher) => (
              <div
                key={researcher.rank}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 text-center text-white font-light">
                    {researcher.rank}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={researcher.user.image} />
                    <AvatarFallback>
                      {researcher.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-light text-white">
                      {researcher.user.username}
                    </span>
                    {researcher.user.country && (
                      <span className="text-gray-400 text-sm ml-2">
                        {researcher.user.country}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-white font-light">
                    {researcher.points.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    {t.common.buttons.points.toLocaleLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
