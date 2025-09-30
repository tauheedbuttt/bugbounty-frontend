import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Clock, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TempBanDialog } from "@/components/TempBanDialog";
import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import { useUser } from "@/hooks/apis/use-users";
import { useUserStore } from "@/stores/user";
import { ADMIN_ROLES, ROLE_TYPES, USER_STATUS } from "@/lib/enums";
import SearchInput from "@/components/ui/search";
import { useDebounce } from "@uidotdev/usehooks";
import { AdminUserResponseData } from "@/types/admin/user";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatusColor } from "@/utils/userUtils";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import AdminProtectedComponent from "@/components/AdminProtectedComponent";
import AdminResearcherStats from "@/components/AdminResearcherStats";
import { useTranslation } from "@/hooks/use-translation";

export default function AdminResearcherManagement() {
  const { t } = useTranslation();
  const { adminRole } = useAuthStore();
  const { users } = useUserStore();

  const researchers = users as AdminUserResponseData[];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [banTargetId, setBanTargetId] = useState<string | null>(null);
  const [banTargetName, setBanTargetName] = useState<string | undefined>();
  const [banDuration, setBanDuration] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const { useGetAdminUsers, useAdminBlueBadgeUser, useAdminBanUser } =
    useUser();

  const { mutate: updateBlueBadge, isPending: isBlueBadgePending } =
    useAdminBlueBadgeUser;

  const { mutate: banUser, isPending: isBanPending } = useAdminBanUser;

  const { data, isFetching, isLoading } = useGetAdminUsers({
    params: {
      page: 1,
      limit: 0,
      role: ROLE_TYPES.Hacker,
      text: debouncedSearch,
      ...(statusFilter !== "all"
        ? { status: statusFilter as USER_STATUS }
        : {}),
    },
  });

  const handleBanUser = (
    researcherId: string,
    banType: "temp" | "perm",
    banDays?: number
  ) => {
    if (banType === "temp" && !banDays) {
      // Open dialog if temp ban triggered without duration
      const researcher = researchers.find((r) => r.id === researcherId);
      setBanTargetId(researcherId);
      setBanTargetName(researcher?.username);
      setBanDialogOpen(true);
      return;
    }
    const status =
      banType === "temp" ? USER_STATUS.TempBan : USER_STATUS.PermBan;

    banUser({
      id: researcherId,
      status,
      banDays,
    });
    setBanDialogOpen(false);
    setBanTargetId(null);
    setBanTargetName(undefined);
    setBanDuration(null);
  };
  const handleTempBanConfirm = (days: number) => {
    if (banTargetId) {
      handleBanUser(banTargetId, "temp", days);
    }
  };
  const handleToggleBlueBadge = (
    researcherId: string,
    currentStatus: boolean
  ) => {
    updateBlueBadge({
      id: researcherId,
      isBlueBadge: !currentStatus,
    });
  };
  const handleUnbanUser = (researcherId: string) => {
    banUser({
      id: researcherId,
      status: USER_STATUS.Active,
    });
  };

  const columns = [
    { label: t.forms.labels.username },
    { label: t.forms.labels.email },
    { label: t.common.buttons.reputation },
    { label: t.common.buttons.reports },
    { label: t.common.buttons.earnings },
    { label: t.forms.labels.status },
    { label: t.common.buttons.blue_badge },
    { label: t.common.buttons.actions, hideRoles: [ADMIN_ROLES.ReaderAdmin] },
  ].filter((item) => !(item.hideRoles ?? [])?.includes(adminRole));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {t.common.buttons.researcher_management}
          </h1>
        </div>

        {/* Quick Stats */}
        <AdminResearcherStats />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{t.common.buttons.search_filter}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t.forms.placeholders.search_reports}
                isLoading={isLoading}
                isFetching={isFetching}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={t.forms.placeholders.filter_by_status}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.values(USER_STATUS).map((item) => (
                    <SelectItem value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Temporary Ban Dialog */}
        <TempBanDialog
          open={banDialogOpen}
          onClose={() => {
            setBanDialogOpen(false);
            setBanTargetId(null);
            setBanTargetName(undefined);
          }}
          onConfirm={handleTempBanConfirm}
          researcherName={banTargetName}
        />

        {/* Researchers Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t.common.buttons.all_researchers}</CardTitle>
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
                {isLoading &&
                  columns.map((item) => (
                    <TableRow key={item.label}>
                      {columns.map((col) => (
                        <TableCell>
                          <Skeleton className={"h-[10px]"} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {researchers.map((researcher) => (
                  <TableRow key={researcher._id}>
                    <TableCell className="font-medium">
                      {researcher.username}
                    </TableCell>
                    <TableCell>{researcher.email}</TableCell>
                    <TableCell>
                      {formatNumber(researcher.reputation, "comma")}
                    </TableCell>
                    <TableCell>
                      {researcher.reportsAccepted}/{researcher.reportsSubmitted}
                    </TableCell>
                    <TableCell>
                      {formatNumber(researcher.totalEarnings, "comma")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(researcher.status)}>
                        {researcher.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {researcher.isBlueBadge && (
                          <InstagramBlueBadge size={20} />
                        )}
                        <AdminProtectedComponent
                          allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                        >
                          <Button
                            disabled={isBlueBadgePending}
                            variant={
                              researcher.isBlueBadge ? "outline" : "default"
                            }
                            size="sm"
                            className={
                              researcher.isBlueBadge
                                ? "border-gray-400 text-gray-700 hover:bg-gray-100"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }
                            onClick={() =>
                              handleToggleBlueBadge(
                                researcher._id,
                                researcher.isBlueBadge
                              )
                            }
                            title={
                              researcher.isBlueBadge
                                ? t.common.buttons.remove_blue_badge
                                : t.common.buttons.grant_blue_badge
                            }
                          >
                            {researcher.isBlueBadge ? (
                              <>
                                <span className="sr-only">
                                  {t.common.buttons.remove_blue_badge}
                                </span>
                                <X className="h-4 w-4 text-gray-700" />
                                <span className="ml-1 hidden md:inline">
                                  {t.common.buttons.remove}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="sr-only">
                                  {t.common.buttons.grant_blue_badge}
                                </span>
                                <InstagramBlueBadge
                                  size={18}
                                  className="inline"
                                />
                                <span className="ml-1 hidden md:inline text-white">
                                  {t.common.buttons.grant}
                                </span>
                              </>
                            )}
                          </Button>
                        </AdminProtectedComponent>
                      </div>
                    </TableCell>
                    <AdminProtectedComponent
                      allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                    >
                      <TableCell>
                        <div className="flex gap-2">
                          {researcher.status === USER_STATUS.Active && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={isBanPending}
                                onClick={() =>
                                  handleBanUser(researcher._id, "temp")
                                }
                                title={t.common.buttons.temporary_ban}
                              >
                                <Clock className="h-4 w-4 text-yellow-600" />
                                <span className="ml-1 hidden md:inline text-yellow-800">
                                  {t.common.buttons.temp_ban}
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={isBanPending}
                                onClick={() =>
                                  handleBanUser(researcher._id, "perm")
                                }
                                title={t.common.buttons.permanent_ban}
                              >
                                <Ban className="h-4 w-4 text-red-600" />
                                <span className="ml-1 hidden md:inline text-red-700">
                                  {t.common.buttons.perm_ban}
                                </span>
                              </Button>
                            </>
                          )}
                          {(researcher.status === USER_STATUS.TempBan ||
                            researcher.status === USER_STATUS.PermBan) && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-700 hover:bg-green-50"
                              disabled={isBanPending}
                              onClick={() => handleUnbanUser(researcher._id)}
                              title={t.common.buttons.unban_researcher}
                            >
                              <span className="sr-only">
                                {" "}
                                {t.common.buttons.unban_researcher}
                              </span>
                              <Shield className="h-4 w-4 text-green-600" />
                              <span className="ml-1 hidden md:inline">
                                {t.common.buttons.unban}
                              </span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </AdminProtectedComponent>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
