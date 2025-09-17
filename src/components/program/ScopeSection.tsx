import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { AdminProgramDetail } from "@/types/admin/program";
import { Target, X } from "lucide-react";

interface ScopeSection {
  scope: AdminProgramDetail[];
  outOfScope: AdminProgramDetail[];
}

export default function ScopeSection({ scope, outOfScope }: ScopeSection) {
  const { t } = useTranslation();
  const isScope = scope.length > 0;
  const isOutOfScope = outOfScope.length > 0;
  return (
    <>
      {isScope && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t.common.buttons.scope}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {scope.map((item) => (
                <li key={item.description} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {isOutOfScope && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="relative w-5 h-5">
                <Target className="h-5 w-5" />
                <X className="h-5 w-5 absolute inset-0 text-red-500" />
              </div>
              {t.common.buttons.out_of_scope}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {outOfScope.map((item) => (
                <li key={item.description} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
