import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminProgramAsset } from "@/types/admin/program";
import { Globe } from "lucide-react";

interface AssetsSectionProps {
  assets: AdminProgramAsset[];
}

export default function AssetsSection({ assets }: AssetsSectionProps) {
  return (
    assets?.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets.map((item) => (
              <div key={item.url} className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium text-sm text-muted-foreground mb-2">
                  {item.name}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );
}
