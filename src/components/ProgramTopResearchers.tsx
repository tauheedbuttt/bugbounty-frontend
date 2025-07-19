import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/apis/use-users";
import { Link } from "react-router-dom";

const ProgramTopResearchers = () => {
  const { useGetProgramResearchers } = useUser();

  const { data } = useGetProgramResearchers({});

  const researchers = data?.data?.researchers ?? [];

  const topResearchers = researchers.map((item) => ({
    name: item.researcher.username,
    reports: item.count,
  }));

  return (
    <Card className="w-full xl:max-w-3xl mx-auto overflow-x-auto">
      <CardHeader>
        <CardTitle>Top Researchers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topResearchers.map((researcher, index) => (
            <div
              key={researcher.name}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div>
                  {/* Researcher's name as a link (remove underscores from slug for cleaner handle) */}
                  <Link
                    to={`/@${researcher.name.replace(/_/g, "")}/`}
                    className="font-medium text-primary underline hover:text-primary/80 transition-colors"
                  >
                    {researcher.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {researcher.reports} reports
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
