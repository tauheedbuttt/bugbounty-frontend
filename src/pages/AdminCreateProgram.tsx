import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AdminProgramCreateData } from "@/types/admin/program";
import { BOUNTY_TYPE, PROGRAM_STATUS, REWARD_TYPE } from "@/lib/enums";
import { useProgram } from "@/hooks/apis/use-program";
import AdminProgramFields from "@/components/admin/AdminProgramFields";
import { Label } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { ROUTE_PATHS } from "@/constants/routes";
import { BOUNTY_REWARDS } from "@/constants/constants";
import { programCreateValidationSchema } from "@/validations/program";

export default function AdminCreateProgram() {
  const { t, currentLanguage } = useTranslation();
  const { useAddAdminProgram } = useProgram();

  const { mutate: addProgram, isPending } = useAddAdminProgram;

  const formik = useFormik<AdminProgramCreateData>({
    initialValues: {
      name: "",
      company: "",
      description: "",
      status: PROGRAM_STATUS.Active,
      members: [],
      profileImage: "",
      image: "",
      assets: [],
      applicationTypes: [],
      details: [],
      rewardType: REWARD_TYPE.Points,
      bounties: BOUNTY_REWARDS.map((br) => ({
        type: br.key,
        moneyReward: 0,
        pointsReward: 0,
        swagReward: "",
      })),
    },
    validationSchema: programCreateValidationSchema(t),
    onSubmit: (values) => {
      addProgram(values);
    },
  });
  const { values: formData, setValues: setFormData, handleSubmit } = formik;

  const [newTriagerEmail, setNewTriagerEmail] = useState("");

  const handleInviteTriager = () => {
    if (
      newTriagerEmail &&
      !formData.members.find((t) => t === newTriagerEmail)
    ) {
      setFormData({
        ...formData,
        members: [...formData.members, newTriagerEmail],
      });
      setNewTriagerEmail("");
    }
  };

  const handleRemoveTriager = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((t) => t !== email),
    }));
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to={ROUTE_PATHS.ADMIN_PROGRAMS}>
            <Button variant="ghost" size="sm">
              {currentLanguage === "ar" ? (
                <ArrowRight className="h-4 w-4 mr-2" />
              ) : (
                <ArrowLeft className="h-4 w-4 mr-2" />
              )}
              {t.common.buttons.back_to_programs}
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {t.common.buttons.create_new_program}
          </h1>
        </div>

        <div className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>{t.common.buttons.program_details}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-3xl mx-auto mt-4"
              >
                <AdminProgramFields formik={formik} isEdit={false} />

                <div className="space-y-4">
                  {formData.members.length === 0 && (
                    <>
                      <Label>Invite Managers to Program</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newTriagerEmail}
                          onChange={(e) => setNewTriagerEmail(e.target.value)}
                          placeholder={t.forms.placeholders.enter_manager_email}
                          type="email"
                          className="flex-1"
                        />
                        <Button
                          className={cn(
                            "flex gap-2",
                            currentLanguage === "ar" ? "flex-row-reverse" : ""
                          )}
                          type="button"
                          onClick={handleInviteTriager}
                        >
                          <Send className="h-4 w-4" />
                          {t.common.buttons.invite}
                        </Button>
                      </div>
                    </>
                  )}
                  {formData.members.length > 0 && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Invited Manager
                      </Label>
                      {formData.members.map((member) => (
                        <div
                          key={member}
                          className="bg-muted p-3 rounded border"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{member}</span>
                              {/* {member.invitationSent && (
                                <div className="flex items-center gap-1 text-green-600 text-sm">
                                  <Check className="h-3 w-3" />
                                  <span>Invitation sent</span>
                                </div>
                              )} */}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTriager(member)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {formik.errors.members && formik.touched.members && (
                    <p
                      id={`members-error`}
                      className={cn("text-sm text-destructive mt-1")}
                    >
                      {formik.errors.members}
                    </p>
                  )}
                </div>
                <Button
                  isLoading={isPending}
                  disabled={isPending}
                  type="submit"
                  className="w-full"
                >
                  {t.common.buttons.create_program}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
