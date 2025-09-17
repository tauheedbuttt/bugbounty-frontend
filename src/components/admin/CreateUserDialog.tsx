
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateUserDialog({ open, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "User created", description: `Created ${username} (${email})` });
      setLoading(false);
      setEmail("");
      setUsername("");
      onOpenChange(false);
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Enter details for a new user account. This is only available to admins.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <Input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !username || !email}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
