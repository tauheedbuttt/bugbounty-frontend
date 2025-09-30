import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgram } from "@/hooks/apis/use-program";
import {
  ADMIN_ROLES,
  BOUNTY_TYPE,
  PROGRAM_STATUS,
  REWARD_TYPE,
} from "@/lib/enums";
import { AdminProgramCreateData } from "@/types/admin/program";
import { useFormik } from "formik";
import AdminProgramFields from "./AdminProgramFields";
import AdminProtectedComponent from "../AdminProtectedComponent";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { programEditValidationSchema } from "@/validations/program";

interface AdminEditProgramDialogProps {
  program: any;
  isEditDrawerOpen: boolean;
  setIsEditDrawerOpen: (value: boolean) => void;
}

const AdminEditProgramDialog = ({
  program,
  isEditDrawerOpen,
  setIsEditDrawerOpen,
}: AdminEditProgramDialogProps) => {
  const { t, currentLanguage } = useTranslation();
  const { useUpdateAdminProgram } = useProgram();

  program = {
    ...program,
    bounties: program?.bounties?.map((item) => ({ ...item, unique: item._id })),
    details: program?.details?.map((item) => ({ ...item, unique: item._id })),
    assets: program?.assets?.map((item) => ({ ...item, unique: item._id })),
  };

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
      bounties: Object.values(BOUNTY_TYPE).map((type) => ({
        type,
        moneyReward: 0,
        pointsReward: 0,
      })),
      ...program,
    },
    validationSchema: programEditValidationSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProgram(values);
    },
  });
  const { handleSubmit } = formik;
  const { mutate: updateProgram, isPending } = useUpdateAdminProgram(
    formik.values,
    () => setIsEditDrawerOpen(false)
  );

  return (
    <Dialog open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
      <DialogContent className="max-w-3xl mx-auto w-full p-0">
        <ScrollArea className="h-[80vh] md:h-[90vh] w-full px-4 md:px-8">
          <div className="py-6">
            <div
              className={cn(
                "flex items-center gap-4",
                currentLanguage === "ar" ? "flex-row-reverse" : ""
              )}
            >
              <h2 className="text-2xl font-bold text-foreground">
                {t.common.buttons.edit_program_details}
              </h2>
            </div>
            {program && (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-3xl mx-auto mt-4"
              >
                <AdminProgramFields isEdit formik={formik} />

                <AdminProtectedComponent
                  allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                >
                  <Button
                    isLoading={isPending}
                    disabled={isPending}
                    type="submit"
                    className="w-full mt-6"
                  >
                    {t.common.buttons.save_changes}
                  </Button>
                </AdminProtectedComponent>
              </form>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditProgramDialog;
