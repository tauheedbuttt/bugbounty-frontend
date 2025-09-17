import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/hooks/apis/use-auth";
import { useTranslation } from "@/hooks/use-translation";

export default function AccountSettingsPage() {
  const { role } = useAuthStore();
  const { t } = useTranslation();
  const { useGetProfile } = useAuth(role);

  const { data, isFetching } = useGetProfile({});
  const profile = data?.data;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {t.common.buttons.account_settings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general">
                {t.common.buttons.general}
              </TabsTrigger>
              <TabsTrigger value="security">
                {t.common.buttons.security}
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto max-h-[70vh]">
              <TabsContent value="general">
                <GeneralSettings isFetching={isFetching} profile={profile} />
              </TabsContent>
              <TabsContent value="security">
                <SecuritySettings profile={profile} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
