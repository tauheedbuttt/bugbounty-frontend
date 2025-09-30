import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import useStorage from "@/hooks/supabase/use-storage";
import { useTranslation } from "@/hooks/use-translation";
import { ApplicationTypeIcons, RewardTypeIcons } from "@/lib/constant";
import {
  ADMIN_ROLES,
  APPLICATION_TYPE,
  BOUNTY_TYPE,
  PROGRAM_DETAILS_TYPE,
  REWARD_TYPE,
} from "@/lib/enums";
import { cn } from "@/lib/utils";
import { AdminProgramCreateData } from "@/types/admin/program";
import { extractSupabaseFilename } from "@/utils/supabaseUtls";
import { FormikProps } from "formik";
import { groupBy } from "lodash";
import {
  DollarSign,
  FileText,
  Gift,
  Globe,
  Monitor,
  Plus,
  Target,
  Trophy,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import AdminProtectedComponent from "../AdminProtectedComponent";

interface AdminProgramFieldsProps {
  formik: FormikProps<AdminProgramCreateData>;
  isEdit?: boolean;
}

const AdminProgramFields = ({ isEdit, formik }: AdminProgramFieldsProps) => {
  const { t, currentLanguage } = useTranslation();
  const applyAlignment = currentLanguage === "ar" && isEdit;

  const { handleFileUpload, handleFileDelete, uploading, deleting } =
    useStorage();

  const [newAsset, setNewAsset] = useState({ name: "", url: "" });
  const [newScopeItem, setNewScopeItem] = useState("");
  const [newOutOfScopeItem, setNewOutOfScopeItem] = useState("");
  const [newRuleItem, setNewRuleItem] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const newItems = {
    [PROGRAM_DETAILS_TYPE.Scope]: {
      newItem: newScopeItem,
      setNewItem: setNewScopeItem,
    },
    [PROGRAM_DETAILS_TYPE.OutOfScope]: {
      newItem: newOutOfScopeItem,
      setNewItem: setNewOutOfScopeItem,
    },
    [PROGRAM_DETAILS_TYPE.Guidelines]: {
      newItem: newRuleItem,
      setNewItem: setNewRuleItem,
    },
  };

  const { values: formData, setValues: setFormData, errors, touched } = formik;

  const applicationTypesData = Object.values(APPLICATION_TYPE).map((type) => ({
    type,
    Icon: ApplicationTypeIcons[type],
  }));
  const rewardTypesData = Object.values(REWARD_TYPE).map((type) => ({
    type,
    Icon: RewardTypeIcons[type],
  }));

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.url) {
      const assets = groupBy(
        [...formData.assets, { unique: Date.now().toString(), ...newAsset }],
        (item) => `${item.name}-${item.url}`
      );
      const assetsUnique = Object.keys(assets).map((key) => assets[key][0]);
      setFormData((prev) => ({
        ...prev,
        assets: assetsUnique,
      }));
      setNewAsset({ name: "", url: "" });
    }
  };

  const handleRemoveAsset = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((asset) => asset.unique !== id),
    }));
  };

  const handleAddDetails = (type: PROGRAM_DETAILS_TYPE, value?: string) => {
    const { newItem, setNewItem } = newItems[type];
    const stringValue = value ? value : newItem;
    if (stringValue) {
      const baseTimestamp = Date.now();
      const lines = stringValue
        .split("\n")
        .filter((item) => !!item)
        .map((description, index) => ({
          unique: (baseTimestamp + index).toString(), // ensures +1ms per line
          type,
          description: description,
        }));
      const details = groupBy(
        [...formData.details, ...lines],
        (item) => `${item.type}-${item.description}`
      );
      const detailsUnique = Object.keys(details).map((key) => details[key][0]);

      setFormData({
        ...formData,
        details: detailsUnique,
      });
      setNewItem("");
    }
  };

  const handleRemoveDetails = (unique: string) => {
    setFormData({
      ...formData,
      details: formData.details.filter((item) => item.unique !== unique),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await handleFileUpload(e, "program");
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: event.target?.result as string,
          image: url,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    const fileName = extractSupabaseFilename(formData.image);
    await handleFileDelete(fileName);
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
      image: "",
    }));
    // Reset input to allow re-upload of the same image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateBountyReward = (
    type: BOUNTY_TYPE,
    field: "moneyReward" | "pointsReward" | "swagReward",
    value: number | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      bounties: prev.bounties.map((reward) =>
        reward.type === type ? { ...reward, [field]: value } : reward
      ),
    }));
  };

  const handleApplicationTypes = (applicationType: APPLICATION_TYPE) => {
    let applicationTypes = formData.applicationTypes;
    if (applicationTypes.includes(applicationType)) {
      applicationTypes = applicationTypes.filter(
        (type) => type !== applicationType
      );
    } else {
      applicationTypes.push(applicationType);
    }
    setFormData({
      ...formData,
      applicationTypes,
    });
  };

  const sections = [
    {
      key: PROGRAM_DETAILS_TYPE.Scope,
      label: (
        <>
          <Target className="h-5 w-5" />
          {t.common.buttons.scope_accepted_vulnerabilities}
        </>
      ),
      newItem: newScopeItem,
      setNewItem: setNewScopeItem,
      placeholder: t.forms.placeholders.eg_sql_injection_vulnerabilities,
      dotColor: "bg-green-500",
    },
    {
      key: PROGRAM_DETAILS_TYPE.OutOfScope,
      label: (
        <>
          <div className="relative w-5 h-5">
            <Target className="h-5 w-5" />
            <X className="h-5 w-5 absolute inset-0 text-red-500" />
          </div>
          {t.common.buttons.out_of_scope_not_accepted}
        </>
      ),
      newItem: newOutOfScopeItem,
      setNewItem: setNewOutOfScopeItem,
      placeholder: t.forms.placeholders.eg_denial_of_service_dos_attacks,
      dotColor: "bg-red-500",
    },
    {
      key: PROGRAM_DETAILS_TYPE.Guidelines,
      label: (
        <>
          <FileText className="h-5 w-5" />
          {t.common.buttons.rules_guidelines}
        </>
      ),
      newItem: newRuleItem,
      setNewItem: setNewRuleItem,
      placeholder: t.forms.placeholders.testing_guideline_example,
      dotColor: "bg-black",
    },
  ].map((item) => ({
    ...item,
    items: formData.details.filter((detail) => detail.type === item.key),
  }));

  return (
    <>
      {/* Image */}
      <div className="space-y-4">
        <Label>{t.forms.labels.program_profile_image}</Label>
        <div
          className={cn(
            "flex items-center gap-4",
            applyAlignment ? "flex-row-reverse" : ""
          )}
        >
          {uploading ?? deleting ? (
            <Skeleton className="w-20 h-20 rounded-lg object-cover border-2 border-border bg-gray-300" />
          ) : formData.profileImage ? (
            <div className="relative">
              <img
                src={formData.profileImage}
                alt={t.forms.labels.program_profile}
                className="w-20 h-20 rounded-lg object-cover border-2 border-border"
              />
              <AdminProtectedComponent allowedRoles={[ADMIN_ROLES.SuperAdmin]}>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </AdminProtectedComponent>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <AdminProtectedComponent
              allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
              disabled
            >
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
                ref={fileInputRef}
              />
            </AdminProtectedComponent>
            <p className="text-sm text-muted-foreground mt-1">
              {t.common.buttons.upload_a_logo_or_image_for_the_program}
            </p>
          </div>
        </div>
      </div>

      {/* Name Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t.forms.labels.program_name}</Label>

          <AdminProtectedComponent
            allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
            disabled
          >
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder={t.forms.placeholders.eg_acme_security_program}
              required
              error={errors.name && touched.name ? errors.name : undefined}
            />
          </AdminProtectedComponent>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{t.forms.labels.link}</Label>

          <AdminProtectedComponent
            allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
            disabled
          >
            <Input
              id="company"
              type="url"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                })
              }
              placeholder={t.forms.placeholders.eg_company_link}
              required
              error={
                errors.company && touched.company ? errors.company : undefined
              }
            />
          </AdminProtectedComponent>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{t.forms.labels.description}</Label>
        <AdminProtectedComponent
          allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
          disabled
        >
          <RichTextEditor
            content={formData.description}
            onChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            placeholder={t.forms.placeholders.describe_the_bug_bounty_program}
          />
        </AdminProtectedComponent>
        {errors.description && touched.description && (
          <p
            id={`description-error`}
            className={cn("text-sm text-destructive mt-1")}
          >
            {errors.description}
          </p>
        )}
      </div>

      {/* Application Types */}
      <div className="space-y-4">
        <Label
          className={cn(
            "flex items-center gap-2",
            applyAlignment ? "flex-row-reverse" : ""
          )}
        >
          <Monitor className="h-5 w-5" />
          {t.forms.placeholders.application_types}
        </Label>
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          {applicationTypesData.map(({ type, Icon }) => (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <Label htmlFor="web-app">{type}</Label>
              </div>

              <AdminProtectedComponent
                allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
                disabled
              >
                <Switch
                  id="web-app"
                  checked={formData.applicationTypes.includes(type)}
                  onCheckedChange={() => handleApplicationTypes(type)}
                />
              </AdminProtectedComponent>
            </div>
          ))}
        </div>

        {errors.applicationTypes && touched.applicationTypes && (
          <p
            id={`applicationTypes-error`}
            className={cn("text-sm text-destructive mt-1")}
          >
            {errors.applicationTypes}
          </p>
        )}
      </div>

      {/* Assets */}
      <div className="space-y-4">
        <Label
          className={cn(
            "flex items-center gap-2",
            applyAlignment ? "flex-row-reverse" : ""
          )}
        >
          <Globe className="h-5 w-5" />
          {t.forms.labels.assets}
        </Label>

        <AdminProtectedComponent allowedRoles={[ADMIN_ROLES.SuperAdmin]}>
          <div
            className={cn(
              "flex gap-2",
              applyAlignment ? "flex-row-reverse" : ""
            )}
          >
            <Input
              value={newAsset.name}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder={t.forms.placeholders.asset_name_eg_main_application}
              className="flex-1"
            />
            <Input
              value={newAsset.url}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAsset();
                }
              }}
              placeholder={t.forms.placeholders.asset_url}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddAsset}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </AdminProtectedComponent>
        {formData.assets.length > 0 && (
          <div className="space-y-3">
            {formData.assets.map((asset) => (
              <div key={asset.unique} className="p-3 bg-muted/50 rounded-lg">
                <div
                  className={cn(
                    "flex items-center justify-between",
                    applyAlignment ? "flex-row-reverse" : ""
                  )}
                >
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">
                      {asset.name}
                    </div>
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {asset.url}
                    </a>
                  </div>
                  <AdminProtectedComponent
                    allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAsset(asset.unique)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </AdminProtectedComponent>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scope */}
      {/* Out of Scope */}
      {/* Rules & Guidlines */}
      {sections.map((section) => (
        <div className="space-y-4" key={section.key}>
          <Label
            className={cn(
              "flex items-center gap-2",
              applyAlignment ? "flex-row-reverse" : ""
            )}
          >
            {section.label}
          </Label>

          <AdminProtectedComponent allowedRoles={[ADMIN_ROLES.SuperAdmin]}>
            <div
              className={cn(
                "flex gap-2",
                applyAlignment ? "flex-row-reverse" : ""
              )}
            >
              <Input
                component="textarea"
                id={section.key}
                value={section.newItem}
                onChange={(e) => {
                  section.setNewItem(e.target.value);
                  const lines = e.target.value.split(/\r?\n/);
                  if (lines.length > 1) {
                    handleAddDetails(section.key, e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDetails(section.key);
                  }
                }}
                placeholder={section.placeholder}
                className="flex-1 resize-none"
              />
              <Button
                type="button"
                onClick={() => handleAddDetails(section.key)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </AdminProtectedComponent>
          {section.items.length > 0 && (
            <div className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item.unique}
                  className={cn(
                    "flex items-center justify-between bg-muted/50 p-3 rounded-lg",
                    applyAlignment ? "flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-2",
                      applyAlignment ? "flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${section.dotColor} mt-2 flex-shrink-0`}
                    ></div>
                    <span>{item.description}</span>
                  </div>
                  <AdminProtectedComponent
                    allowedRoles={[ADMIN_ROLES.SuperAdmin]}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDetails(item.unique)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </AdminProtectedComponent>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Bounties */}
      <div className="space-y-4">
        <Label
          className={cn(
            "flex items-center gap-2",
            applyAlignment ? "flex-row-reverse" : ""
          )}
        >
          <Trophy className="h-5 w-5" />
          {t.common.buttons.bounty_rewards_structure}
        </Label>

        <div className="space-y-4">
          {/* Reward Type */}
          <div className="space-y-2">
            <Label>{t.forms.placeholders.reward_type}</Label>

            <AdminProtectedComponent
              disabled
              allowedRoles={[ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.ReaderAdmin]}
            >
              <RadioGroup
                value={formData.rewardType}
                onValueChange={(rewardType: REWARD_TYPE) =>
                  setFormData({
                    ...formData,
                    rewardType,
                  })
                }
                className={cn(
                  "flex gap-6",
                  applyAlignment ? "flex-row-reverse" : ""
                )}
              >
                {rewardTypesData.map(({ type, Icon }) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="flex items-center gap-1">
                      <Icon className="h-4 w-4" />
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AdminProtectedComponent>
          </div>

          {/* Bounties */}
          <div className="space-y-3">
            {formData.bounties.map((reward) => (
              <div
                key={reward.type}
                className={cn(
                  "p-4 rounded-lg border bg-card",
                  applyAlignment ? "flex flex-col items-end" : ""
                )}
              >
                <div className={"flex items-center justify-between mb-3"}>
                  <h4 className="font-semibold capitalize text-foreground">
                    {reward.type}
                  </h4>
                </div>
                <div
                  className={cn(
                    "grid grid-cols-1  gap-4 ",
                    currentLanguage === "en"
                      ? "md:grid-cols-2"
                      : [
                          REWARD_TYPE.BountyPoints,
                          REWARD_TYPE.SwagPoints,
                        ].includes(formData.rewardType)
                      ? "md:grid-cols-2"
                      : ""
                  )}
                >
                  {/* Points */}
                  <div className="space-y-2">
                    <Label
                      className={cn(
                        "flex items-center gap-1 text-sm",
                        applyAlignment ? "flex-row-reverse" : ""
                      )}
                    >
                      <Trophy className="h-3 w-3" />
                      {t.common.buttons.points_reward}
                    </Label>
                    <AdminProtectedComponent
                      disabled
                      allowedRoles={[
                        ADMIN_ROLES.SuperAdmin,
                        ADMIN_ROLES.ReaderAdmin,
                      ]}
                    >
                      <Input
                        type="number"
                        min="0"
                        value={reward.pointsReward}
                        onChange={(e) =>
                          updateBountyReward(
                            reward.type,
                            "pointsReward",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className={cn(
                          "text-sm",
                          applyAlignment ? "text-right" : ""
                        )}
                      />
                    </AdminProtectedComponent>
                  </div>
                  {/* Bounties */}
                  {[
                    REWARD_TYPE.BountyPoints,
                    REWARD_TYPE.SwagBountyPoints,
                  ].includes(formData.rewardType) && (
                    <div className="space-y-2">
                      <Label
                        className={cn(
                          "flex items-center gap-1 text-sm",
                          applyAlignment ? "flex-row-reverse" : ""
                        )}
                      >
                        <DollarSign className="h-3 w-3" />
                        {t.common.buttons.money_reward}
                      </Label>

                      <AdminProtectedComponent
                        disabled
                        allowedRoles={[
                          ADMIN_ROLES.SuperAdmin,
                          ADMIN_ROLES.ReaderAdmin,
                        ]}
                      >
                        <Input
                          type="number"
                          min="0"
                          value={reward.moneyReward}
                          onChange={(e) =>
                            updateBountyReward(
                              reward.type,
                              "moneyReward",
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                          className={cn(
                            "text-sm",
                            applyAlignment ? "text-right" : ""
                          )}
                        />
                      </AdminProtectedComponent>
                    </div>
                  )}
                  {/* Swag */}
                  {[
                    REWARD_TYPE.SwagPoints,
                    REWARD_TYPE.SwagBountyPoints,
                  ].includes(formData.rewardType) && (
                    <div className="space-y-2">
                      <Label
                        className={cn(
                          "flex items-center gap-1 text-sm",
                          applyAlignment ? "flex-row-reverse" : ""
                        )}
                      >
                        <Gift className="h-3 w-3" />
                        {t.common.buttons.swag_reward}
                      </Label>
                      <AdminProtectedComponent
                        disabled
                        allowedRoles={[
                          ADMIN_ROLES.SuperAdmin,
                          ADMIN_ROLES.ReaderAdmin,
                        ]}
                      >
                        <Input
                          type="text"
                          value={reward.swagReward}
                          onChange={(e) =>
                            updateBountyReward(
                              reward.type,
                              "swagReward",
                              e.target.value
                            )
                          }
                          placeholder={t.common.buttons.swag_examples}
                          className={cn(
                            "text-sm",
                            applyAlignment ? "text-right" : ""
                          )}
                        />
                      </AdminProtectedComponent>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProgramFields;
