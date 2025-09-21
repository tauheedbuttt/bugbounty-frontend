import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search";
import { useLeaderboard } from "@/hooks/apis/use-leaderboard";
import { useTranslation } from "@/hooks/use-translation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function LeaderboardUi({
  container = "container mx-auto px-6 py-12",
}) {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

  const [params, setParams] = useState({
    limit: 0,
    page: 1,
  });

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      text: searchTerm.trim() || undefined,
      page: 1, // Reset to first page on new search
    }));
  };

  const { useGetLeaderboard } = useLeaderboard();
  const { data, isFetching } = useGetLeaderboard({
    params: params,
  });

  const topResearchers = [...(data?.data?.items ?? [])]?.sort(
    (a, b) => a.rank - b.rank
  );
  return (
    <div className={container}>
      {/* Search */}
      <div className="flex-1 w-full flex gap-2 mb-10">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search researchers or countries..."
          className="flex-1 min-w-0 [&>input]:bg-white [&>input]:!text-black [&>input]:border-gray-300 [&>input]:placeholder:text-gray-500 [&>input]:focus:border-blue-500"
        />
        <Button
          onClick={handleSearch}
          size="default"
          isLoading={isFetching}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 flex-shrink-0"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      {/* List */}
      <div className="rounded-3xl p-8 !bg-muted">
        {/* Researchers List */}
        <div className="space-y-2">
          {topResearchers.map((researcher) => (
            <div
              key={researcher.rank}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-primary font-light">
                  {researcher.rank}
                </span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={researcher.user.image} />
                  <AvatarFallback className="bg-muted-foreground">
                    {researcher.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <span className="font-light text-primary">
                    {researcher.user.username}
                  </span>
                  {researcher.user.country && (
                    <span className="text-gray-400 text-sm ">
                      {researcher.user.country}
                    </span>
                  )}
                  {researcher.user.isBlueBadge && (
                    <InstagramBlueBadge size={18} className="inline" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-primary font-light">
                  {researcher.points.toLocaleString()}
                </span>
                <span className="text-primary text-sm ml-1">
                  {t.common.buttons.points.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
