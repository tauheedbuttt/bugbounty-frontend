import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/apis/use-auth";
import { useAuthStore } from "@/stores/auth";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { Dialog2FA } from "./Dialog2FA";
import { UpdateProfileData } from "@/types/auth";
import { useTranslation } from "@/hooks/use-translation";

interface SecuritySettingsProps {
  profile: UpdateProfileData;
}

export function SecuritySettings({ profile }: SecuritySettingsProps) {
  const { t, currentLanguage } = useTranslation();
  const { role } = useAuthStore();
  const { useGetSession } = useAuth(role);

  const { data, isFetching } = useGetSession({
    params: {
      page: 1,
      limit: 0,
    },
  });

  const sessions = data?.data?.items ?? [];
  const total = data?.data?.total;

  const columns = [
    { label: t.common.buttons.id },
    { label: t.common.messages.browser },
    { label: t.common.buttons.created_at },
    { label: t.forms.labels.last_used },
    { label: t.forms.labels.status },
  ];

  return (
    <div className="space-y-6">
      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  {t.common.buttons.two_factor_authentication}
                </h3>
                <Badge variant="secondary">
                  {profile?.is2FA
                    ? t.common.buttons.active
                    : t.common.buttons.inactive}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.common.buttons.two_factor_authentication_description}
              </p>
              <Dialog2FA profile={profile} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">
                {t.common.buttons.change_password}
              </h3>
              <p className="text-sm text-muted-foreground">
                {
                  t.common.buttons
                    .update_your_password_to_ensure_your_account_security
                }
              </p>
              <ChangePasswordDialog hasPassword={profile?.hasPassword} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.common.buttons.session_history}</CardTitle>
            <Badge variant="outline">{total}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((item) => (
                  <TableHead key={item.label}>{item.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching &&
                columns.map((item) => (
                  <TableRow key={item.label}>
                    {columns.map((col) => (
                      <TableCell>
                        <Skeleton className={"h-[10px]"} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {sessions.map((session) => (
                <TableRow key={session._id}>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.browser}</TableCell>
                  <TableCell>{dayjs(session.createdAt).toString()}</TableCell>
                  <TableCell>{dayjs(session.updatedAt).toString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        session.status
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
