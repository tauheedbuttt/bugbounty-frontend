import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/apis/use-users";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { InstagramBlueBadge } from "./InstagramBlueBadge";

const ProgramTopResearchers = () => {
  const { t, currentLanguage } = useTranslation();
  const { useGetProgramResearchers } = useUser();

  const { data } = useGetProgramResearchers({});

  const researchers = data?.data?.researchers ?? [];

  const topResearchers = researchers.map((item) => ({
    name: item.researcher.username,
    reports: item.count,
    isBlueBadge: item.researcher.isBlueBadge,
  }));

  return (
    <Card className="w-full xl:max-w-3xl mx-auto overflow-x-auto">
      <CardHeader>
        <CardTitle>{t.common.buttons.top_researchers}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topResearchers.map((researcher, index) => (
            <div
              key={researcher.name}
              className={cn(
                "flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg gap-4"
              )}
            >
              <div
                className={cn(
                  "flex items-center space-x-4 gap-2 w-full",
                  currentLanguage === "ar" ? "flex-row-reverse" : ""
                )}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 justify-between w-full">
                  {/* Researcher's name as a link (remove underscores from slug for cleaner handle) */}
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-primary hover:text-primary/80 transition-colors">
                      {researcher.name}
                    </div>
                    {researcher.isBlueBadge && (
                      <InstagramBlueBadge size={18} className="inline" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {researcher.reports} {t.common.buttons.reports}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramTopResearchers;
