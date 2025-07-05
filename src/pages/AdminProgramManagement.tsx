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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  X,
  Plus,
  Pause,
  Play,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  Users,
  Upload,
  Search,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgram } from "@/hooks/apis/use-program";
import { useProgramStore } from "@/stores/program";
import { PROGRAM_STATUS, PROGRAM_VISIBILITY } from "@/lib/enums";
import { useDebounce } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProgramManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PROGRAM_STATUS>(
    "all"
  );
  const { programs, setPrograms } = useProgramStore();
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const { toast } = useToast();
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

  // Handle profile image upload/change for edit program
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!editingProgram || !file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setEditingProgram((prev: any) => ({
        ...prev,
        profileImage: event.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setEditingProgram((prev: any) => ({
      ...prev,
      profileImage: "",
    }));
  };

  const handleSaveProgram = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingProgram) return;
    setPrograms(
      programs.map((program) =>
        program.id === editingProgram.id
          ? {
              ...editingProgram,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : program
      )
    );
    setIsEditDrawerOpen(false);
    setEditingProgram(null);
    toast({
      title: "Program Updated",
      description: "Program details have been successfully updated",
    });
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
    { label: "Program Name", className: "min-w-[200px]" },
    { label: "Company", className: "min-w-[150px]" },
    { label: "Status" },
    { label: "Visibility" },
    { label: "Reports" },
    { label: "Participants" },
    { label: "Last Updated", className: "min-w-[120px]" },
    { label: "Actions", className: "min-w-[160px]" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Program Management
        </h1>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/admin/programs/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Program
          </Link>
        </Button>
      </div>

      {/* Quick Stats - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Programs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Programs
            </CardTitle>
            <Badge className="bg-green-500/10 text-green-500">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                programs.filter((p) => p.status === PROGRAM_STATUS.Active)
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paused Programs
            </CardTitle>
            <Badge className="bg-yellow-500/10 text-yellow-500">Paused</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                programs.filter((p) => p.status === PROGRAM_STATUS.Paused)
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
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
                placeholder="Search by program name or company..."
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
          <CardTitle>All Programs</CardTitle>
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
                      {/* Edit (Drawer) */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProgram(program)}
                        title="Edit Program"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {/* Explicit Hide/Show Button */}
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
                            ? "Hide Program"
                            : "Show Program"
                        }
                      >
                        {program.visibility === PROGRAM_VISIBILITY.Public ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {/* Pause/Play Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(program._id, program.status)
                        }
                        title={
                          program.status === PROGRAM_STATUS.Active
                            ? "Pause Program"
                            : "Activate Program"
                        }
                      >
                        {program.status === PROGRAM_STATUS.Active ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProgram(program._id)}
                        title="Delete Program"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Program Full Drawer (like create page, no invite managers) */}
      <Drawer open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
        <DrawerContent className="max-w-2xl mx-auto w-full p-0">
          <ScrollArea className="h-[80vh] md:h-[90vh] w-full px-4 md:px-8">
            <div className="py-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditDrawerOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <h2 className="text-2xl font-bold text-foreground">
                  Edit Program Details
                </h2>
              </div>
              {editingProgram && (
                <form
                  onSubmit={handleSaveProgram}
                  className="space-y-6 max-w-2xl mx-auto mt-4"
                >
                  {/* Profile Image Section (same as create) */}
                  <div className="space-y-4">
                    <Label>Program Profile Image</Label>
                    <div className="flex items-center gap-4">
                      {editingProgram.profileImage ? (
                        <div className="relative">
                          <img
                            src={editingProgram.profileImage}
                            alt="Program profile"
                            className="w-20 h-20 rounded-lg object-cover border-2 border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Upload a logo or image for the program (PNG, JPG, GIF)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Program Name</Label>
                      <Input
                        id="name"
                        value={editingProgram.name}
                        onChange={(e) =>
                          setEditingProgram((p: any) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Acme Security Program"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={editingProgram.company}
                        onChange={(e) =>
                          setEditingProgram((p: any) => ({
                            ...p,
                            company: e.target.value,
                          }))
                        }
                        placeholder="e.g., Acme Corp"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <RichTextEditor
                      content={editingProgram.description}
                      onChange={(content) =>
                        setEditingProgram((p: any) => ({
                          ...p,
                          description: content,
                        }))
                      }
                      placeholder="Describe the bug bounty program..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scope">Scope</Label>
                    <RichTextEditor
                      content={editingProgram.scope}
                      onChange={(content) =>
                        setEditingProgram((p: any) => ({
                          ...p,
                          scope: content,
                        }))
                      }
                      placeholder="Define what's in scope for this program..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rewards">Reward Structure</Label>
                    <RichTextEditor
                      content={editingProgram.rewards}
                      onChange={(content) =>
                        setEditingProgram((p: any) => ({
                          ...p,
                          rewards: content,
                        }))
                      }
                      placeholder="Define the reward structure (e.g., Critical: $1000, High: $500...)"
                    />
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    Save Changes
                  </Button>
                </form>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      {/* Delete Confirmation Dialog (with admin credentials) */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="font-semibold text-foreground">
              Are you sure you want to permanently remove this program?
            </p>
            <p className="text-muted-foreground text-sm">
              This action cannot be undone. Please confirm your admin username
              and password to proceed.
            </p>
            <div className="space-y-2">
              <Label htmlFor="adminUsername">Username</Label>
              <Input
                id="adminUsername"
                value={adminUsername}
                autoFocus
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
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
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                className="bg-black hover:bg-black/80 text-white"
                onClick={handleDeleteConfirm}
              >
                Delete Program
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
