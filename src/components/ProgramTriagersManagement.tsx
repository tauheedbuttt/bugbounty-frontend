import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/apis/use-users";
import { useTranslation } from "@/hooks/use-translation";
import { PROGRAM_ROLES } from "@/lib/enums";
import { useUserStore } from "@/stores/user";
import { ProgramUserResponseData } from "@/types/program/user";
import { BarChart3, Check, Eye, Mail, Shield, UserCog, X } from "lucide-react";
import { useState } from "react";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import ProgramTeamRoles from "./ProgramTeamRoles";

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
  const { t } = useTranslation();
  const { users } = useUserStore();
  const team = users as ProgramUserResponseData[];

  const {
    useGetProgramUsers,
    useProgramInviteUser,
    useProgramRemoveUser,
    useProgramUpdateUser,
  } = useUser();

  const { mutate: updateRole } = useProgramUpdateUser;
  useGetProgramUsers({
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
      setError(t.common.buttons.please_enter_a_valid_email_address);
      return;
    }
    if (!role) {
      setError(t.common.buttons.please_select_role);
      return;
    }
    if (team.some((t) => t.email === email.trim())) {
      setError(t.common.buttons.member_already_invited);
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
        <CardTitle>{t.common.buttons.team_management}</CardTitle>
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
                  {t.forms.labels.email}
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
                  {t.forms.labels.role}
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="invite-role" className="w-full sm:w-40">
                    <SelectValue placeholder={t.common.buttons.select_role} />
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
                  {t.common.buttons.invite}
                </Button>
              </div>
            </div>
          </ProgramProtectedComponent>
          {error && (
            <div className="text-destructive text-sm mt-1">{error}</div>
          )}

          {/* List */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">
              {t.common.buttons.team_members}
            </h3>
            {team.length === 0 ? (
              <div className="text-muted-foreground text-sm">
                {t.common.buttons.no_team_members_yet}
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
                            value={member.programmembers?.role}
                            onValueChange={(newRole) =>
                              updateMemberRole(
                                member._id,
                                newRole as PROGRAM_ROLES
                              )
                            }
                          >
                            <SelectTrigger className="w-36 h-7 text-xs bg-secondary">
                              <SelectValue
                                placeholder="Role"
                                className="whitespace-nowrap"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(PROGRAM_ROLES).map((option) => (
                                <SelectItem
                                  className="text-xs whitespace-nowrap"
                                  key={option}
                                  value={option}
                                >
                                  <span className="flex items-center gap-1">
                                    {getRoleIcon(option)}
                                    <span className="whitespace-nowrap">
                                      {option}
                                    </span>
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
                                {t.common.buttons.remove_team_member}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t.common.buttons.confirm_remove_prefix}{" "}
                                <span className="font-bold">
                                  {member.email}
                                </span>{" "}
                                {t.common.buttons.confirm_remove_suffix}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel asChild>
                                <Button variant="outline" type="button">
                                  {t.common.buttons.cancel}
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button
                                  variant="destructive"
                                  type="button"
                                  isLoading={isRemovePending}
                                  onClick={() => removeMember(member._id)}
                                >
                                  {t.common.buttons.yes_remove_team_member}
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
