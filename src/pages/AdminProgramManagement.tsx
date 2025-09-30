import AdminEditProgramDialog from "@/components/admin/AdminEditProgramDialog";
import AdminProgramStats from "@/components/AdminProgramStats";
import AdminProtectedComponent from "@/components/AdminProtectedComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTE_PATHS } from "@/constants/routes";
import { useProgram } from "@/hooks/apis/use-program";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { ADMIN_ROLES, PROGRAM_STATUS, PROGRAM_VISIBILITY } from "@/lib/enums";
import { useProgramStore } from "@/stores/program";
import { useDebounce } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import {
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProgramManagement() {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PROGRAM_STATUS>(
    "all"
  );
  const { programs } = useProgramStore();
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { useGetAdminPrograms, useActionsAdminProgram, useDeleteAdminProgram } =
    useProgram();
  const { mutate: actionsProgram } = useActionsAdminProgram;
  const { mutate: deleteProgram } = useDeleteAdminProgram;
  const { isFetching, isLoading } = useGetAdminPrograms({
    params: {
      limit: 0,
      page: 1,
      text: debouncedSearch,
      status: statusFilter === "all" ? undefined : statusFilter,
    },
  });

  // Helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case PROGRAM_STATUS.Active:
        return "secondary";
      case PROGRAM_STATUS.Paused:
        return "default";
      case "closed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "public":
        return "secondary";
      case "private":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Edit logic using Drawer instead of Dialog
  const handleEditProgram = (program: any) => {
    setEditingProgram({ ...program });
    setIsEditDrawerOpen(true);
  };

  const handleToggleVisibility = (
    programId: string,
    currentVisibility: PROGRAM_VISIBILITY
  ) => {
    const newVisibility =
      currentVisibility === PROGRAM_VISIBILITY.Private
        ? PROGRAM_VISIBILITY.Public
        : PROGRAM_VISIBILITY.Private;
    actionsProgram({ id: programId, visibility: newVisibility });
  };

  const handleToggleStatus = (
    programId: string,
    currentStatus: PROGRAM_STATUS
  ) => {
    const newStatus =
      currentStatus === PROGRAM_STATUS.Active
        ? PROGRAM_STATUS.Paused
        : PROGRAM_STATUS.Active;
    actionsProgram({ id: programId, status: newStatus });
  };

  // Enhanced delete logic with confirmation & credential input
  const handleRemoveProgram = (programId: string) => {
    setDeleteTargetId(programId);
    setIsDeleteDialogOpen(true);
    setDeleteError("");
    setAdminUsername("");
    setAdminPassword("");
  };

  const handleDeleteConfirm = () => {
    // Minimal fake admin validation; you can extend logic
    if (!adminUsername || !adminPassword) {
      setDeleteError("Please enter your username and password.");
      return;
    }
    deleteProgram({
      email: adminUsername,
      password: adminPassword,
      id: deleteTargetId,
    });
    setIsDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const programsMapped = programs.map((program) => ({
    ...program,
    updatedAt: dayjs(program.updatedAt).format("YYYY-MM-DD"),
  }));

  const columns = [
    { label: t.forms.labels.program_name, className: "min-w-[200px]" },
    { label: t.forms.labels.link, className: "min-w-[150px]" },
    { label: t.forms.labels.status },
    { label: t.common.buttons.visibility },
    { label: t.common.buttons.reports },
    { label: t.common.buttons.participants },
    { label: t.common.buttons.last_updated, className: "min-w-[120px]" },
    { label: t.common.buttons.actions, className: "min-w-[160px]" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t.common.buttons.program_management}
        </h1>
        <AdminProtectedComponent allowedRoles={[ADMIN_ROLES.SuperAdmin]}>
          <Button asChild className="w-full sm:w-auto">
            <Link to={ROUTE_PATHS.ADMIN_CREATE_PROGRAM}>
              <Plus className="h-4 w-4 mr-2" />
              {t.common.buttons.create_program}
            </Link>
          </Button>
        </AdminProtectedComponent>
      </div>

      {/* Quick Stats - Responsive Grid */}
      <AdminProgramStats />

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t.forms.placeholders.search_reports}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              {isFetching && !isLoading ? (
                <Loader2 className="absolute left-3 top-1/3 h-4 w-4 text-muted-foreground animate-spin" />
              ) : (
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                placeholder={
                  t.forms.placeholders.search_by_program_name_or_company
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(
                  value === "all" ? "all" : (value as PROGRAM_STATUS)
                )
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={PROGRAM_STATUS.Active}>Active</SelectItem>
                <SelectItem value={PROGRAM_STATUS.Paused}>Paused</SelectItem>
                <SelectItem value={PROGRAM_STATUS.Closed}>Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle> {t.common.buttons.all_programs}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((item) => (
                  <TableHead key={item.label} className={item.className}>
                    {item.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                columns.map((item) => (
                  <TableRow key={item.label}>
                    {columns.map((col) => (
                      <TableCell className={col.className}>
                        <Skeleton className={"h-[10px]"} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {programsMapped.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.company}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(program.status)}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getVisibilityColor(program.visibility)}>
                      {program.visibility}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.reportsCount}</TableCell>
                  <TableCell>{program.participantsCount}</TableCell>
                  <TableCell>{program.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {/* View Details */}
                      <AdminProtectedComponent
                        allowedRoles={[ADMIN_ROLES.ReaderAdmin]}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProgram(program)}
                          title={t.common.buttons.view_program}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </AdminProtectedComponent>

                      {/* Edit (Drawer) */}
                      <AdminProtectedComponent
                        allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProgram(program)}
                          title={t.common.buttons.edit_program}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </AdminProtectedComponent>
                      {/* Explicit Hide/Show Button */}

                      <AdminProtectedComponent
                        allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleToggleVisibility(
                              program._id,
                              program.visibility
                            )
                          }
                          title={
                            program.visibility === PROGRAM_VISIBILITY.Public
                              ? t.common.buttons.hide_program
                              : t.common.buttons.show_program
                          }
                        >
                          {program.visibility === PROGRAM_VISIBILITY.Public ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </AdminProtectedComponent>
                      {/* Pause/Play Button */}
                      <AdminProtectedComponent
                        allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleToggleStatus(program._id, program.status)
                          }
                          title={
                            program.status === PROGRAM_STATUS.Active
                              ? t.common.buttons.pause_program
                              : t.common.buttons.activate_program
                          }
                        >
                          {program.status === PROGRAM_STATUS.Active ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </AdminProtectedComponent>
                      {/* Delete Button */}
                      <AdminProtectedComponent
                        allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProgram(program._id)}
                          title={t.common.buttons.delete_program}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AdminProtectedComponent>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Program Full Drawer (like create page, no invite managers) */}
      <AdminEditProgramDialog
        isEditDrawerOpen={isEditDrawerOpen}
        setIsEditDrawerOpen={setIsEditDrawerOpen}
        program={editingProgram}
      />

      {/* Delete Confirmation Dialog (with admin credentials) */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.common.buttons.delete_program}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="font-semibold text-foreground">
              {t.common.buttons.are_you_sure_you_want_to_permanently_remove}
            </p>
            <p className="text-muted-foreground text-sm">
              {t.common.buttons.confirm_admin_removal_warning}
            </p>
            <div className="space-y-2">
              <Label htmlFor="adminUsername">{t.forms.labels.username}</Label>
              <Input
                id="adminUsername"
                value={adminUsername}
                autoFocus
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">{t.forms.labels.password}</Label>
              <Input
                id="adminPassword"
                value={adminPassword}
                type="password"
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            {deleteError && (
              <p className="text-destructive text-sm">{deleteError}</p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                {t.common.buttons.cancel}
              </Button>
              <Button
                type="button"
                variant="default"
                className="bg-black hover:bg-black/80 text-white"
                onClick={handleDeleteConfirm}
              >
                {t.common.buttons.delete_program}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
