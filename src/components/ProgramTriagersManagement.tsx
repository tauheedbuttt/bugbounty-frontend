import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Mail,
  Check,
  X,
  UserCog,
  Shield,
  BarChart3,
  Eye,
  UserMinus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProgramTeamRoles from "./ProgramTeamRoles";
import { PROGRAM_ROLES } from "@/lib/enums";
import { useUserStore } from "@/stores/user";
import { ProgramUserResponseData } from "@/types/program/user";
import { useUser } from "@/hooks/apis/use-users";
import ProgramProtectedComponent from "./ProgramProtectedComponent";

// Define TeamMember type
type TeamMember = {
  email: string;
  invited: boolean;
  role: PROGRAM_ROLES;
};

export function getRoleIcon(roleValue: PROGRAM_ROLES) {
  switch (roleValue) {
    case PROGRAM_ROLES.SuperAdmin:
      return <Shield className="h-4 w-4 mr-1 text-primary" />;
    case PROGRAM_ROLES.Triager:
      return <UserCog className="h-4 w-4 mr-1 text-blue-900" />;
    case PROGRAM_ROLES.Accountant:
      return <BarChart3 className="h-4 w-4 mr-1 text-green-700" />;
    case PROGRAM_ROLES.ViewerAdmin:
      return <Eye className="h-4 w-4 mr-1 text-muted-foreground" />;
    default:
      return null;
  }
}

export default function ProgramTriagersManagement() {
  const { users, setUsers: setTeam } = useUserStore();
  const team = users as ProgramUserResponseData[];

  const {
    useGetProgramUsers,
    useProgramInviteUser,
    useProgramRemoveUser,
    useProgramUpdateUser,
  } = useUser();

  const { mutate: updateRole, isPending: isUpdatePending } =
    useProgramUpdateUser;
  const { isLoading, isFetching } = useGetProgramUsers({
    params: {
      page: 1,
      limit: 0,
    },
  });

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);

  const { mutate: removeUser, isPending: isRemovePending } =
    useProgramRemoveUser(() => setDeleteCandidate(null));
  const { mutate: inviteMember, isPending: isInvitePending } =
    useProgramInviteUser(() => {
      setEmail("");
      setRole("");
    });

  function handleInvite() {
    setError("");
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (team.some((t) => t.email === email.trim())) {
      setError("This member is already invited.");
      return;
    }
    inviteMember({
      email: email.trim(),
      programRole: role as PROGRAM_ROLES,
    });
  }

  function removeMember(id: string) {
    removeUser({ id });
  }

  function updateMemberRole(id: string, role: PROGRAM_ROLES) {
    updateRole({
      id,
      role,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <ProgramTeamRoles />

          {/* Invite */}
          <ProgramProtectedComponent allowedRoles={[PROGRAM_ROLES.SuperAdmin]}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 bg-secondary p-4 rounded">
              <div className="w-full sm:w-auto flex-1">
                <label
                  className="text-xs text-muted-foreground block mb-1"
                  htmlFor="invite-email"
                >
                  Email
                </label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="team@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div className="w-full sm:w-auto flex-1">
                <label
                  className="text-xs text-muted-foreground block mb-1"
                  htmlFor="invite-role"
                >
                  Role
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="invite-role" className="w-full sm:w-40">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PROGRAM_ROLES).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto flex-shrink-0">
                <Button
                  type="button"
                  onClick={handleInvite}
                  disabled={!email || !role}
                  className="w-full sm:w-auto"
                  isLoading={isInvitePending}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </ProgramProtectedComponent>
          {error && (
            <div className="text-destructive text-sm mt-1">{error}</div>
          )}

          {/* List */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Team Members</h3>
            {team.length === 0 ? (
              <div className="text-muted-foreground text-sm">
                No team members yet.
              </div>
            ) : (
              <ul className="space-y-3">
                {team.map((member) => (
                  <li
                    key={member.email}
                    className="flex flex-col md:flex-row md:items-center justify-between bg-muted px-4 py-3 rounded gap-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                      <div className="flex items-center gap-2 min-w-[180px]">
                        <Badge variant="default">{member.email}</Badge>
                        <span className="flex items-center gap-1 text-green-700 text-xs font-medium">
                          <Check className="h-3 w-3" /> {member.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-0 sm:ml-3">
                        <span className="hidden sm:flex">
                          {getRoleIcon(member.programmembers?.role)}
                        </span>

                        <ProgramProtectedComponent
                          allowedRoles={[
                            PROGRAM_ROLES.SuperAdmin,
                            PROGRAM_ROLES.ViewerAdmin,
                          ]}
                          disabled
                        >
                          <Select
                            value={member.programmembers.role}
                            onValueChange={(newRole) =>
                              updateMemberRole(
                                member._id,
                                newRole as PROGRAM_ROLES
                              )
                            }
                          >
                            <SelectTrigger className="w-36 h-7 text-xs bg-secondary">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(PROGRAM_ROLES).map((option) => (
                                <SelectItem
                                  className="text-xs"
                                  key={option}
                                  value={option}
                                >
                                  <span className="flex items-center gap-1">
                                    {getRoleIcon(option)}
                                    {option}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </ProgramProtectedComponent>
                      </div>
                    </div>

                    <ProgramProtectedComponent
                      allowedRoles={[PROGRAM_ROLES.SuperAdmin]}
                    >
                      <div className="flex justify-end mt-2 md:mt-0 md:pl-4">
                        <AlertDialog
                          open={deleteCandidate === member._id}
                          onOpenChange={(open) => {
                            if (!open) setDeleteCandidate(null);
                          }}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteCandidate(member._id)}
                              className="text-destructive px-2"
                              title="Remove"
                              aria-label={`Remove ${member._id}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove Team Member
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove{" "}
                                <span className="font-bold">
                                  {member.email}
                                </span>{" "}
                                from the team? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel asChild>
                                <Button variant="outline" type="button">
                                  Cancel
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button
                                  variant="destructive"
                                  type="button"
                                  isLoading={isRemovePending}
                                  onClick={() => removeMember(member._id)}
                                >
                                  Yes, remove team member
                                </Button>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </ProgramProtectedComponent>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
