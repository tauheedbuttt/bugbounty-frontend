import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminProgramDetail } from "@/types/admin/program";
import { Award, FileText } from "lucide-react";
interface RulesSectionProps {
  rules: AdminProgramDetail[];
}
export default function RulesSection({ rules }: RulesSectionProps) {
  return (
    rules.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Rules & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {rules.map((item) => (
              <li key={item.description} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  );
}
