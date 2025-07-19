import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, Clock, Award } from "lucide-react";
import { HackerProgramById } from "@/types/hacker/program";
import { AdminProgramDetail } from "@/types/admin/program";
import { getProgramReward, programTimeLeft } from "@/lib/utils";

interface ProgramSidebarProps {
  program: HackerProgramById;
  rules: AdminProgramDetail[];
  onSubmitReport: () => void;
}

export default function ProgramSidebar({
  program,
  rules,
  onSubmitReport,
}: ProgramSidebarProps) {
  const reward = getProgramReward(program.prices);
  const timeLeft = programTimeLeft(program.updatedAt);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Program Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-primary">{reward}</p>
              <p className="text-sm text-muted-foreground">Reward Range</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">{timeLeft}</p>
              <p className="text-sm text-muted-foreground">Last Updated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" onClick={onSubmitReport}>
          Submit Report
        </Button>
        {rules.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Guidelines
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Rules & Guidelines
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <ul className="space-y-3">
                  {rules.map((rule, index) => (
                    <li
                      key={rule.description}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">
                        {rule.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
