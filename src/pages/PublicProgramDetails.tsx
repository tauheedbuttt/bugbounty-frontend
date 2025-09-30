import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, DollarSign, Clock } from "lucide-react";

export default function PublicProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Always show the same program data to match the screenshot
  const program = {
    id: id || '1',
    name: 'Acme Security Program 3rd',
    organization: 'Acme Corp',
    type: 'web',
    description: 'Random Description'
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground p-0"
              onClick={() => navigate('/programs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Program Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded text-primary-foreground flex items-center justify-center font-bold text-lg">
                      A
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{program.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{program.organization}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        Informational
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Monitor className="w-4 h-4" />
                        <span>Web Application</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Random Description</p>
                  <p>This is a sample security program for testing vulnerabilities in web applications.</p>
                </div>
              </CardContent>
            </Card>

            {/* Bounty Rewards */}
            <Card>
              <CardHeader>
                <CardTitle>Bounty Rewards</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Vulnerability severity levels and corresponding rewards.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Reward Scale</span>
                    <span className="text-sm text-muted-foreground">100%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { level: 'Low', reward: '$5', percentage: '0%' },
                    { level: 'Medium', reward: '$10', percentage: '0%' },
                    { level: 'High', reward: '$15', percentage: '0%' },
                    { level: 'Critical', reward: '$14', percentage: '0%' },
                    { level: 'Informational', reward: '$30', percentage: '0%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium w-4">{index + 1}.</span>
                        <span className="text-sm">{item.level}</span>
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{item.percentage}</span>
                      </div>
                      <span className="text-sm font-medium">{item.reward}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    ⚠️ Higher severity vulnerabilities receive better rewards
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Program Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">$</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">5 - 30</div>
                    <div className="text-xs text-muted-foreground">Reward Range</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-right">
                    <div className="font-medium">3 minutes ago</div>
                    <div className="text-xs text-muted-foreground">Last Updated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Report Button */}
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
              onClick={() => navigate('/hacker/login')}
            >
              Submit Report
            </Button>

            {/* View Guidelines */}
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                View Guidelines
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}