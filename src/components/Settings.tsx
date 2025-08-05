// Only show settings (dialog) to admins (reflected in parent).
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminSettingsGeneral } from "./admin/AdminSettingsGeneral";
import { AdminSettingsSecurity } from "./admin/AdminSettingsSecurity";
import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/hooks/apis/use-auth";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Settings({ open, onOpenChange }: SettingsProps) {
  const { t, currentLanguage } = useTranslation();
  const { role } = useAuthStore();
  const { useGetProfile } = useAuth(role);
  const { data, isFetching: loading } = useGetProfile({});
  const profile = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader
          className={cn(
            "flex w-full",
            currentLanguage === "ar" ? "justify-end flex-row-reverse" : ""
          )}
        >
          <DialogTitle className="text-3xl font-bold">
            {t.common.buttons.admin_settings}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="general">
              {" "}
              {t.common.buttons.general}
            </TabsTrigger>
            <TabsTrigger value="security">
              {" "}
              {t.common.buttons.settings}
            </TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto max-h-[60vh]">
            <TabsContent value="general">
              <AdminSettingsGeneral
                isProfileLoading={loading}
                profile={profile}
              />
            </TabsContent>
            <TabsContent value="security">
              <AdminSettingsSecurity profile={profile} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
