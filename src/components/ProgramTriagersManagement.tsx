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

// Team roles and their descriptions
const teamRoles = [
  {
    value: "super_admin",
    label: "Super Admin",
    description: "Full access to all program features and settings.",
  },
  {
    value: "triager",
    label: "Triager",
    description: "Access and manage reports only.",
  },
  {
    value: "accountant",
    label: "Accountant",
    description: "Access to analytics and payments only.",
  },
  {
    value: "viewer_admin",
    label: "Viewer Admin",
    description: "Can view everything but cannot modify or manage content.",
  },
];

// Define TeamMember type
type TeamMember = {
  email: string;
  invited: boolean;
  role: string;
};

export default function ProgramTriagersManagement() {
  const [team, setTeam] = useState<TeamMember[]>([
    { email: "alice@example.com", invited: true, role: "super_admin" },
  ]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);

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
    setTeam([...team, { email: email.trim(), invited: true, role }]);
    setEmail("");
    setRole("");
  }

  function removeMember(emailToRemove: string) {
    setTeam(team.filter((t) => t.email !== emailToRemove));
    setDeleteCandidate(null);
  }

  function updateMemberRole(emailToUpdate: string, newRole: string) {
    setTeam(team =>
      team.map(member =>
        member.email === emailToUpdate
          ? { ...member, role: newRole }
          : member
      )
    );
  }

  function getRoleLabel(roleValue: string) {
    const found = teamRoles.find((r) => r.value === roleValue);
    return found ? found.label : roleValue;
  }

  function getRoleIcon(roleValue: string) {
    switch (roleValue) {
      case "super_admin":
        return <Shield className="h-4 w-4 mr-1 text-primary" />;
      case "triager":
        return <UserCog className="h-4 w-4 mr-1 text-blue-900" />;
      case "accountant":
        return <BarChart3 className="h-4 w-4 mr-1 text-green-700" />;
      case "viewer_admin":
        return <Eye className="h-4 w-4 mr-1 text-muted-foreground" />;
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-md font-semibold mb-2 text-foreground">
              Team Roles
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {teamRoles.map((role) => (
                <li
                  key={role.value}
                  className="flex items-center gap-2 bg-muted rounded px-3 py-2"
                >
                  {getRoleIcon(role.value)}
                  <div>
                    <span className="font-medium">{role.label}:</span>
                    <span className="ml-1 text-muted-foreground">
                      {role.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

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
                  {teamRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
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
              >
                <Mail className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
          {error && (
            <div className="text-destructive text-sm mt-1">{error}</div>
          )}

          <div>
            <h3 className="font-semibold mb-3 text-foreground">
              Team Members
            </h3>
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
                        {member.invited && (
                          <span className="flex items-center gap-1 text-green-700 text-xs font-medium">
                            <Check className="h-3 w-3" /> Invited
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-0 sm:ml-3">
                        <span className="hidden sm:flex">
                          {getRoleIcon(member.role)}
                        </span>
                        <Select
                          value={member.role}
                          onValueChange={(newRole) =>
                            updateMemberRole(member.email, newRole)
                          }
                        >
                          <SelectTrigger className="w-36 h-7 text-xs bg-secondary">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamRoles.map((option) => (
                              <SelectItem
                                className="text-xs"
                                key={option.value}
                                value={option.value}
                              >
                                <span className="flex items-center gap-1">
                                  {getRoleIcon(option.value)}
                                  {option.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 md:mt-0 md:pl-4">
                      <AlertDialog
                        open={deleteCandidate === member.email}
                        onOpenChange={(open) => {
                          if (!open) setDeleteCandidate(null);
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteCandidate(member.email)}
                            className="text-destructive px-2"
                            title="Remove"
                            aria-label={`Remove ${member.email}`}
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
                                onClick={() => removeMember(member.email)}
                              >
                                Yes, remove team member
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
