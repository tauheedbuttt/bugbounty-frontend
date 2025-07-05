
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLE_LABEL, AdminRole } from "./AdminList";

type Props = {
  onInvite: (email: string, role: AdminRole) => void;
};

const ROLE_OPTIONS: AdminRole[] = ["super", "mediator", "reader"];

export function InviteAdminForm({ onInvite }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("reader");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onInvite(email.trim(), role);
      setEmail("");
      setRole("reader");
      setLoading(false);
    }, 400);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 items-start sm:items-end"
      autoComplete="off"
    >
      <div className="flex flex-col flex-1">
        <label htmlFor="adminEmail" className="text-sm font-medium">
          Invite new admin by email
        </label>
        <Input
          id="adminEmail"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          required
          className="w-full sm:w-80"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="adminRole" className="text-sm font-medium">
          Role
        </label>
        <Select value={role} onValueChange={v => setRole(v as AdminRole)} disabled={loading}>
          <SelectTrigger id="adminRole" className="sm:w-40 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map(r => (
              <SelectItem value={r} key={r}>
                {ROLE_LABEL[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        variant="outline"
        className="bg-black text-white border-black hover:bg-black/90"
        disabled={!email || loading}
      >
        Invite
      </Button>
    </form>
  );
}
