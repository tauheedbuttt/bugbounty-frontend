import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/apis/use-users";
import { ADMIN_ROLES } from "@/lib/enums";
import { useFormik } from "formik";
import { useTranslation } from "@/hooks/use-translation";

export function InviteAdminForm() {
  const { t } = useTranslation();
  const { useAdminInviteUser } = useUser();

  const { values, setValues, errors, touched, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        email: "",
        role: ADMIN_ROLES.ReaderAdmin,
      },
      onSubmit: (values) => {
        inviteUser(values);
      },
    });

  const { mutate: inviteUser, isPending: loading } =
    useAdminInviteUser(resetForm);

  const { email, setEmail } = {
    email: values.email,
    setEmail: (email: string) => setValues({ ...values, email }),
  };
  const { role, setRole } = {
    role: values.role,
    setRole: (role: ADMIN_ROLES) => setValues({ ...values, role }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 items-start sm:items-end"
      autoComplete="off"
    >
      <div className="flex flex-col flex-1">
        <label htmlFor="adminEmail" className="text-sm font-medium">
          {t.common.buttons.invite_new_admin_by_email}
        </label>
        <Input
          id="adminEmail"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="w-full sm:w-80"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="adminRole" className="text-sm font-medium">
          {t.forms.labels.role}
        </label>
        <Select
          value={role}
          onValueChange={(v) => setRole(v as ADMIN_ROLES)}
          disabled={loading}
        >
          <SelectTrigger id="adminRole" className="sm:w-40 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ADMIN_ROLES).map((r) => (
              <SelectItem value={r} key={r}>
                {r}
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
        {t.common.buttons.invite}
      </Button>
    </form>
  );
}
