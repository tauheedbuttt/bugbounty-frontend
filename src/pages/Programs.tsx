import LandingBackButton from "@/components/LandingBackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTE_PATHS } from "@/constants/routes";
import { useProgram } from "@/hooks/apis/use-program";
import { useTranslation } from "@/hooks/use-translation";
import { ApplicationTypeIcons } from "@/lib/constant";
import { APPLICATION_TYPE } from "@/lib/enums";
import { getProgramReward } from "@/lib/utils";
import { useProgramStore } from "@/stores/program";
import { HackerProgramsResponseData } from "@/types/hacker/program";
import { ArrowLeft, Globe, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_LIMIT = 9;

export default function Programs() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState({
    limit: BASE_LIMIT,
    page: 1,
    type: "all",
    text: "",
  });
  const { type, ...paramsWithoutType } = params;

  const { programs } = useProgramStore();

  const { useGetHackerPrograms } = useProgram();

  const { isFetching, isLoading } = useGetHackerPrograms({
    params: {
      ...paramsWithoutType,
      ...(type === "all" ? {} : { type: type as any }),
    },
  });

  const filteredPrograms = programs as HackerProgramsResponseData[];

  const displayedPrograms = filteredPrograms.slice(0, params.limit);
  const hasMorePrograms = params.limit <= filteredPrograms.length;

  const selectedType = params.text;
  const setSelectedType = (type: string) =>
    setParams((prev) => ({ ...prev, type }));

  const handleSearch = () => {
    setParams((prev) => ({ ...prev, text: searchTerm }));
  };

  const loadMorePrograms = () => {
    setParams({ ...params, limit: params.limit + BASE_LIMIT });
  };

  const handleProgramClick = (id: string) =>
    navigate(ROUTE_PATHS.LANDING.PROGRAM_DETAILS.replace(":id", id));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {t.common.buttons.bug_bounty_programs}
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {t.common.buttons.secure_infrastructure_responsible_disclosure}
          </p>

          {/* Search and Filter Section */}
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="flex-1 w-full sm:w-auto flex gap-2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t.common.buttons.search_home_programs_placeholder}
                className="flex-1 !text-black [&>input]:bg-white [&>input]:!text-black [&>input]:border-gray-300 [&>input]:placeholder:text-gray-500"
              />
              <Button
                onClick={handleSearch}
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                disabled={isFetching}
                type="submit"
              >
                <Search className="h-4 w-4 mr-2" />
                {t.common.buttons.search}
              </Button>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48 bg-transparent text-white border-gray-600">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-800 z-50">
                <SelectItem
                  value="all"
                  className="text-white hover:!bg-[#525252] focus:!bg-[#525252]"
                >
                  {t.common.buttons.all_types}
                </SelectItem>
                {Object.values(APPLICATION_TYPE).map((value) => (
                  <SelectItem
                    className="text-white hover:!bg-[#525252] focus:!bg-[#525252]"
                    value={value}
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto px-6 py-12">
        {/* Outer rectangle with #1C1C1C background */}
        <div className="rounded-3xl p-8" style={{ backgroundColor: "#1C1C1C" }}>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className="border-gray-700 hover:bg-gray-500/70 transition-all duration-300 cursor-pointer group backdrop-blur-sm rounded-3xl h-80"
                    style={{ backgroundColor: "#525252" }}
                    onClick={() =>
                      (window.location.href = ROUTE_PATHS.HACKER_LOGIN)
                    }
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex flex-col space-y-6 h-full">
                        <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-colors">
                            <Globe className="w-10 h-10 text-gray-300" />
                          </div>
                          <Skeleton className="border-none flex gap-1 px-1 items-center justify-center w-8 h-8 rounded-lg bg-gray-700/30" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <Skeleton className="w-[90%] h-2 text-white font-light text-lg leading-tight"></Skeleton>
                            <Skeleton className="w-20 h-2 text-gray-300 text-sm font-light"></Skeleton>
                          </div>
                          <Skeleton className="w-20 h-2 text-purple-400 font-medium text-base mt-6"></Skeleton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : filteredPrograms?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg font-light">
                {t.common.buttons.no_programs_found}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {displayedPrograms?.map((program) => {
                  return (
                    <Card
                      key={program._id}
                      className="border-gray-700 hover:bg-gray-500/70 transition-all duration-300 cursor-pointer group backdrop-blur-sm rounded-3xl h-80"
                      style={{ backgroundColor: "#525252" }}
                      onClick={() => handleProgramClick(program.slug)}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex flex-col space-y-6 h-full">
                          <div className="flex items-start justify-between">
                            {program.profileImage ? (
                              <img
                                src={program.profileImage}
                                alt={program.name}
                                className="w-16 h-16 rounded-2xl object-cover bg-gray-700/50 group-hover:bg-gray-600/50 transition-colors"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-colors">
                                {program.name ? (
                                  <span className="text-2xl font-bold text-white">
                                    {program.name.charAt(0).toUpperCase()}
                                  </span>
                                ) : (
                                  <Globe className="w-10 h-10 text-gray-300" />
                                )}
                              </div>
                            )}
                            <div className="flex gap-2 px-1 items-center justify-center ">
                              {program.applicationTypes?.map((item) => {
                                const Icon = ApplicationTypeIcons[item];
                                return (
                                  <Card
                                    key={item}
                                    title={program.applicationTypes.join(", ")}
                                    className="border-none flex gap-1 px-1 items-center justify-center w-8 h-8 rounded-lg bg-gray-700/30"
                                  >
                                    <Icon />
                                  </Card>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                              <h3 className="text-white font-light text-lg leading-tight">
                                {program.name}
                              </h3>
                              <p className="text-gray-300 text-sm font-light">
                                {program.company}
                              </p>
                            </div>
                            <div className="text-purple-400 font-medium text-base mt-6">
                              {getProgramReward(program.prices)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMorePrograms && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={loadMorePrograms}
                    isLoading={isLoading || isFetching}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
