import { generatePDF } from "@/components/HallOfFameCertificate";
import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import LandingBackButton from "@/components/LandingBackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, countryFlags } from "@/constants/constants";
import { useLeaderboard } from "@/hooks/apis/use-leaderboard";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  Download,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_LIMIT = 10;

export default function HallOfFame() {
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountryState] = useState("all");
  const [selectedYear, setSelectedYearState] = useState("all");
  const [countryOpen, setCountryOpen] = useState(false);
  const [params, setParams] = useState({
    limit: BASE_LIMIT,
    page: 1,
  });

  const setSelectedCountry = (country: string) => {
    setSelectedCountryState(country);
    setParams((prev) => ({
      ...prev,
      country: country === "all" ? undefined : country,
    }));
  };

  const setSelectedYear = (year: string) => {
    setSelectedYearState(year);
    setParams((prev) => ({
      ...prev,
      year: year === "all" ? undefined : year,
    }));
  };

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      text: searchTerm.trim() || undefined,
      page: 1, // Reset to first page on new search
    }));
    setVisibleCount(4); // Reset visible count on new search
    setCountryOpen(false); // Close country popover after search
  };

  const loadMore = () => {
    setParams({ ...params, limit: params.limit + BASE_LIMIT });
  };

  const { t } = useTranslation();

  const { useGetLeaderboard, useGetLeaderboardYears } = useLeaderboard();
  const { data: yearsData } = useGetLeaderboardYears({});
  const { data, isFetching } = useGetLeaderboard({
    params,
  });

  const filteredResearchers = (data?.data?.items ?? []).map((item) => ({
    name: item.user?.username,
    avatar: item.user?.image || "/placeholder.svg",
    points: item.points,
    country: item.user?.country || "Unknown",
    firstBugYear: item.report?.createdAt
      ? new Date(item.report.createdAt).getFullYear()
      : new Date().getFullYear(),
    verified: item.user?.isBlueBadge || false,
  }));

  const years = yearsData?.data?.years ?? [2025]; // Only 2025 available

  const displayedResearchers = filteredResearchers.slice(0, visibleCount);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        {" "}
        <LandingBackButton />
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-2">
            {t.common.buttons.bug_bounty_syria_hall_of_fame}
          </h1>
          <p className="text-gray-400 text-lg font-light mb-16">
            {t.common.buttons.exceptional_security_researchers}
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-5xl mx-auto">
            <div className="flex-1 w-full flex gap-2">
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
            <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="w-full sm:w-48 justify-between bg-transparent text-white border-gray-600 hover:bg-transparent hover:text-white hover:border-gray-600"
                  >
                    {selectedCountry === "all"
                      ? "All Countries"
                      : selectedCountry}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0 bg-black border-gray-800 z-50">
                  <Command className="bg-black">
                    <CommandInput
                      placeholder="Search countries..."
                      className="h-9 text-white"
                    />
                    <CommandList className="max-h-60">
                      <CommandEmpty className="text-gray-400">
                        No country found.
                      </CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedCountry("all");
                            setCountryOpen(false);
                          }}
                          className="text-white"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountry === "all"
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          All Countries
                        </CommandItem>
                        {countries.map((country) => (
                          <CommandItem
                            key={country}
                            value={country}
                            onSelect={() => {
                              setSelectedCountry(country);
                              setCountryOpen(false);
                            }}
                            className="text-white"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32 bg-transparent text-white border-gray-600">
                  <SelectValue placeholder="2025" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-800 z-50">
                  <SelectItem
                    value="all"
                    className="text-white hover:!bg-[#525252] focus:!bg-[#525252]"
                  >
                    All Years
                  </SelectItem>
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={`${year}`}
                      className="text-white hover:!bg-[#525252] focus:!bg-[#525252]"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* Researchers Grid */}
        <div className="max-w-5xl mx-auto">
          {filteredResearchers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg font-light">
                No researchers found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {displayedResearchers.map((researcher, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedResearcher(researcher)}
                    className="rounded-lg p-6 transition-all hover:bg-gray-900/50 cursor-pointer group"
                    style={{
                      backgroundColor: "#161616",
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <Avatar className="h-16 w-16 flex-shrink-0">
                        <AvatarImage
                          className="object-cover"
                          src={researcher.avatar}
                        />
                        <AvatarFallback className="bg-gray-700 text-white font-medium text-lg">
                          {researcher.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2  mb-1">
                          <h3 className="text-white font-medium text-lg group-hover:text-gray-300 transition-colors">
                            {researcher.name}
                          </h3>
                          {researcher.verified && (
                            <InstagramBlueBadge
                              size={18}
                              className="inline text-lg"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">
                            {countryFlags[researcher.country] || "🏳️"}
                          </span>
                          <p className="text-gray-400 text-sm">
                            {researcher.country}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-sm font-light bg-transparent text-gray-400 border-gray-600 rounded-lg px-3 py-1 hover:bg-transparent hover:text-gray-400 hover:border-gray-600"
                        >
                          {t.common.buttons.hall_of_fame}{" "}
                          {researcher.firstBugYear}
                        </Badge>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <div className="text-gray-400 text-sm font-medium">
                          {researcher.points.toLocaleString()}{" "}
                          {t.common.buttons.points.toLocaleLowerCase()}
                        </div>
                        <span className="text-gray-500 text-xs">points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredResearchers.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => {
                      loadMore();
                      setVisibleCount((prev) =>
                        Math.min(prev + 4, filteredResearchers.length)
                      );
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Researcher Details Modal */}
      <Dialog
        open={!!selectedResearcher}
        onOpenChange={() => setSelectedResearcher(null)}
      >
        <DialogContent className="bg-black/80 backdrop-blur-sm border-gray-800 text-white w-[85vw] rounded-xl max-w-4xl  shadow-2xl">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-center text-xl font-light text-white">
              {t.common.buttons.security_researcher}
            </DialogTitle>
          </DialogHeader>
          {selectedResearcher && (
            <div className="space-y-4 max-w-md mx-auto">
              {/* Profile Information Card */}
              <div className="bg-white/95 border border-gray-200 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={selectedResearcher.avatar} />
                    <AvatarFallback className="bg-gray-700 text-white text-lg font-medium">
                      {selectedResearcher.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {selectedResearcher.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {countryFlags[selectedResearcher.country] || "🏳️"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {selectedResearcher.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t.common.buttons.security_research}
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                      {t.common.buttons.cybersecurity_expert}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t.common.buttons.member_since}
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                      {selectedResearcher.firstBugYear}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="bg-white/95 border border-gray-200 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                  {t.common.buttons.performance}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {t.forms.labels.total_points}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedResearcher.points.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {t.common.buttons.hall_of_fame}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
                    >
                      {selectedResearcher.firstBugYear}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recognition Card */}
              <div className="bg-white/95 border border-gray-200 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                  {t.common.buttons.recognition}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t.common.buttons.bug_bounty_syria_thanks}
                </p>
              </div>

              {/* Download Button */}
              <div className="text-center pt-2">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg w-full"
                  onClick={async () => await generatePDF(selectedResearcher)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t.common.buttons.download_certificate}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
