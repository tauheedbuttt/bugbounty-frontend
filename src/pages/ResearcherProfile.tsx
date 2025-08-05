import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function ResearcherProfile() {
  const { handle } = useParams<{ handle: string }>();

  // Demo/mock data (replace with API in future)
  const researcherMock = {
    avatar: "/placeholder.svg",
    name: handle || "unknown",
    joinDate: "Joined May 2023",
    rank: 8,
    reports: 10,
    bounties: "USD 8,700",
    points: 5230,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <Card className="max-w-xl mx-auto">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src={researcherMock.avatar} />
              <AvatarFallback>
                {researcherMock.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl mt-3 mb-2">
              {researcherMock.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {researcherMock.joinDate}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Rank: #{researcherMock.rank}
              </Badge>
              <Badge>
                <span className="mr-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                </span>
                {researcherMock.points} pts
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-700"
              >
                Reports: {researcherMock.reports}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Bounties: {researcherMock.bounties}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <p className="text-center text-muted-foreground">
              Researcher profile page.
              <br />
              More info coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
