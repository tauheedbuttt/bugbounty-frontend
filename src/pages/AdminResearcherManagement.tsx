import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Search,
  // <-- RE-ADD THIS!
  Eye,
  Ban,
  Clock,
  Award,
  X,
  Shield,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TempBanDialog } from "@/components/TempBanDialog";
import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import { useUser } from "@/hooks/apis/use-users";
import { useUserStore } from "@/stores/user";
import { ROLE_TYPES, USER_STATUS } from "@/lib/enums";
import SearchInput from "@/components/ui/search";
import { useDebounce } from "@uidotdev/usehooks";
import { AdminUserResponseData } from "@/types/admin/user";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatusColor } from "@/utils/userUtils";
import { formatNumber } from "@/lib/utils";
const mockResearchers = [
  {
    reputation: 850,
    reportsSubmitted: 23,
    reportsAccepted: 18,
    totalEarnings: "$2,500",
  },
  {
    reputation: 1200,
    reportsSubmitted: 45,
    reportsAccepted: 38,
    totalEarnings: "$5,800",
  },
  {
    reputation: 450,
    reportsSubmitted: 12,
    reportsAccepted: 8,
    totalEarnings: "$800",
  },
];
export default function AdminResearcherManagement() {
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

  const total = data?.data?.total ?? 0;

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
    { label: "Username" },
    { label: "Email" },
    { label: "Reputation" },
    { label: "Reports" },
    { label: "Earnings" },
    { label: "Status" },
    { label: "Blue Badge" },
    { label: "Actions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            Researcher Management
          </h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Researchers
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Badge className="bg-green-500/10 text-green-500">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  researchers.filter((r) => r.status === USER_STATUS.Active)
                    .length
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banned</CardTitle>
              <Badge className="bg-red-500/10 text-red-500">Banned</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  researchers.filter((r) =>
                    [USER_STATUS.TempBan, USER_STATUS.PermBan].includes(
                      r.status
                    )
                  ).length
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blue Badge</CardTitle>
              {/* Use the InstagramBlueBadge icon instead of Award */}
              <InstagramBlueBadge size={22} className="mr-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {researchers.filter((r) => r.isBlueBadge).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search reports..."
                isLoading={isLoading}
                isFetching={isFetching}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
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
            <CardTitle>All Researchers</CardTitle>
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
                              ? "Remove Blue Badge"
                              : "Grant Blue Badge"
                          }
                        >
                          {researcher.isBlueBadge ? (
                            <>
                              <span className="sr-only">Remove Blue Badge</span>
                              <X className="h-4 w-4 text-gray-700" />
                              <span className="ml-1 hidden md:inline">
                                Remove
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="sr-only">Grant Blue Badge</span>
                              <InstagramBlueBadge
                                size={18}
                                className="inline"
                              />
                              <span className="ml-1 hidden md:inline text-white">
                                Grant
                              </span>
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
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
                              title="Temporary Ban"
                            >
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="ml-1 hidden md:inline text-yellow-800">
                                Temp Ban
                              </span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={isBanPending}
                              onClick={() =>
                                handleBanUser(researcher._id, "perm")
                              }
                              title="Permanent Ban"
                            >
                              <Ban className="h-4 w-4 text-red-600" />
                              <span className="ml-1 hidden md:inline text-red-700">
                                Perm Ban
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
                            title="Unban Researcher"
                          >
                            <span className="sr-only">Unban Researcher</span>
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="ml-1 hidden md:inline">Unban</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
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
