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

export function SecuritySettings() {
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
    { label: "ID" },
    { label: "Browser" },
    { label: "Created At" },
    { label: "Last used" },
    { label: "Status" },
  ];

  return (
    <div className="space-y-6">
      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Verify with NAFATH نفاذ</h3>
              <p className="text-sm text-muted-foreground">
                Your account is currently pending. Activate it now by using the
                NAFATH verification.
              </p>
              <Button>Verify</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Two-Factor Authentication</h3>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security by enabling two-factor
                authentication.
              </p>
              <Button>Enable</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to ensure your account's security.
              </p>
              <ChangePasswordDialog />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Session History</CardTitle>
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
