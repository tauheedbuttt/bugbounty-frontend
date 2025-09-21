import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface ProgramPaymentStatCardProps {
  title: string;
  value: number;
  colorClass?: string;
  countText: string;
}

export const ProgramPaymentStatCard = ({
  title,
  value,
  colorClass = "",
  countText,
}: ProgramPaymentStatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>
          ${formatNumber(value, "comma")}
        </div>
        <p className="text-xs text-muted-foreground">{countText}</p>
      </CardContent>
    </Card>
  );
};
