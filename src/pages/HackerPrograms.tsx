import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProgram } from "@/hooks/apis/use-program";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { APPLICATION_TYPE, BOUNTY_TYPE } from "@/lib/enums";
import { useProgramStore } from "@/stores/program";
import SearchInput from "@/components/ui/search";
import { HackerProgramsResponseData } from "@/types/hacker/program";
import ProgramGridCard from "@/components/ProgramGridCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";

export default function HackerPrograms() {
  const { t } = useTranslation();
  const { programs } = useProgramStore();

  const [search, setSearch] = useState("");
  const [type, setType] = useState<APPLICATION_TYPE | undefined>();

  const debouncedSearch = useDebounce(search, 300);

  const { useGetHackerPrograms } = useProgram();

  const { data, isFetching, isLoading } = useGetHackerPrograms({
    params: {
      limit: 0,
      page: 1,
      text: debouncedSearch,
      type,
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.common.buttons.programs} ({data?.data?.total ?? 0})
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t.common.buttons.search_programs_placeholder}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          {/* Type */}
          <Select onValueChange={(value) => setType(value as APPLICATION_TYPE)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(APPLICATION_TYPE).map((value) => (
                <SelectItem value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading &&
            Array(8)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[250px] hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95"
                />
              ))}
          {(programs as HackerProgramsResponseData[]).map((program) => (
            <ProgramGridCard program={program} />
          ))}
        </div>
      </div>
    </div>
  );
}
