import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AdminProgramCreateData } from "@/types/admin/program";
import { BOUNTY_TYPE, PROGRAM_STATUS, REWARD_TYPE } from "@/lib/enums";
import { useProgram } from "@/hooks/apis/use-program";
import AdminProgramFields from "@/components/admin/AdminProgramFields";
import { Label } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function AdminCreateProgram() {
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
      rewardType: REWARD_TYPE.Bounty,
      bounties: Object.values(BOUNTY_TYPE).map((type) => ({
        type,
        moneyReward: 0,
        pointsReward: 0,
      })),
    },
    onSubmit: (values) => {
      addProgram(values);
    },
  });
  const { values: formData, setValues: setFormData, handleSubmit } = formik;

  const [newTriagerEmail, setNewTriagerEmail] = useState("");

  const handleInviteTriager = () => {
    if (
      newTriagerEmail &&
      !formData.members.find((t) => t === newTriagerEmail) &&
      formData.members.length === 0
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
          <Link to="/admin/programs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Create New Program
          </h1>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AdminProgramFields formik={formik} />

                <div className="space-y-4">
                  {formData.members.length === 0 && (
                    <>
                      <Label>Invite Managers to Program</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newTriagerEmail}
                          onChange={(e) => setNewTriagerEmail(e.target.value)}
                          placeholder="Enter manager email"
                          type="email"
                          className="flex-1"
                        />
                        <Button type="button" onClick={handleInviteTriager}>
                          <Send className="h-4 w-4 mr-2" />
                          Invite
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
                </div>
                <Button
                  isLoading={isPending}
                  disabled={isPending}
                  type="submit"
                  className="w-full"
                >
                  Create Program
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
