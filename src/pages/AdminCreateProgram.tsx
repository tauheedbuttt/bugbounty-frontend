import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  Plus,
  Upload,
  X,
  Send,
  Check,
  Globe,
  Target,
  Smartphone,
  Monitor,
  DollarSign,
  Trophy,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";
import { useFormik } from "formik";
import { AdminProgramCreateData } from "@/types/admin/program";
import {
  APPLICATION_TYPE,
  BOUNTY_TYPE,
  PROGRAM_DETAILS_TYPE,
  PROGRAM_STATUS,
  REWARD_TYPE,
} from "@/lib/enums";
import { ApplicationTypeIcons, RewardTypeIcons } from "@/lib/constant";
import { useProgram } from "@/hooks/apis/use-program";
import { groupBy } from "lodash";

interface Triager {
  email: string;
  invitationSent: boolean;
}

interface Asset {
  id: string;
  name: string;
  url: string;
}

interface ScopeItem {
  id: string;
  text: string;
}

interface RuleItem {
  id: string;
  text: string;
}

interface BountyReward {
  severity: "low" | "medium" | "high" | "critical";
  money: number;
  points: number;
}

export default function AdminCreateProgram() {
  const { useAddAdminProgram } = useProgram();

  const { mutate: addProgram, isPending } = useAddAdminProgram;

  const {
    values: formData,
    setValues: setFormData,
    errors,
    touched,
    handleSubmit,
  } = useFormik<AdminProgramCreateData>({
    initialValues: {
      name: "",
      company: "",
      description: "",
      status: PROGRAM_STATUS.Active,
      members: [],
      profileImage: "",
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

  const [newTriagerEmail, setNewTriagerEmail] = useState("");
  const [newAsset, setNewAsset] = useState({ name: "", url: "" });
  const [newScopeItem, setNewScopeItem] = useState("");
  const [newOutOfScopeItem, setNewOutOfScopeItem] = useState("");
  const [newRuleItem, setNewRuleItem] = useState("");

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

  const applicationTypesData = Object.values(APPLICATION_TYPE).map((type) => ({
    type,
    Icon: ApplicationTypeIcons[type],
  }));
  const rewardTypesData = Object.keys(REWARD_TYPE).map((type) => ({
    type,
    Icon: RewardTypeIcons[type],
  }));

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  const updateBountyReward = (
    type: BOUNTY_TYPE,
    field: "moneyReward" | "pointsReward",
    value: number
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
          Scope (Accepted Vulnerabilities)
        </>
      ),
      newItem: newScopeItem,
      setNewItem: setNewScopeItem,
      placeholder: "e.g., SQL Injection vulnerabilities",
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
          Out of Scope (Not Accepted)
        </>
      ),
      newItem: newOutOfScopeItem,
      setNewItem: setNewOutOfScopeItem,
      placeholder: "e.g., Denial of Service (DoS) attacks",
      dotColor: "bg-red-500",
    },
    {
      key: PROGRAM_DETAILS_TYPE.Guidelines,
      label: (
        <>
          <FileText className="h-5 w-5" />
          Rules & Guidelines
        </>
      ),
      newItem: newRuleItem,
      setNewItem: setNewRuleItem,
      placeholder: "e.g., Do not perform testing that could disrupt services",
      dotColor: "bg-black",
    },
  ].map((item) => ({
    ...item,
    items: formData.details.filter((detail) => detail.type === item.key),
  }));

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
                {/* Image */}
                <div className="space-y-4">
                  <Label>Program Profile Image</Label>
                  <div className="flex items-center gap-4">
                    {formData.profileImage ? (
                      <div className="relative">
                        <img
                          src={formData.profileImage}
                          alt="Program profile"
                          className="w-20 h-20 rounded-lg object-cover border-2 border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload a logo or image for the program (PNG, JPG, GIF)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Program Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g., Acme Security Program"
                      required
                      error={
                        errors.name && touched.name ? errors.name : undefined
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: e.target.value,
                        })
                      }
                      placeholder="e.g., Acme Corp"
                      required
                      error={
                        errors.name && touched.name ? errors.name : undefined
                      }
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(content) =>
                      setFormData({ ...formData, description: content })
                    }
                    placeholder="Describe the bug bounty program..."
                  />
                </div>

                {/* Application Types */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Application Types
                  </Label>
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    {applicationTypesData.map(({ type, Icon }) => (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <Label htmlFor="web-app">{type}</Label>
                        </div>
                        <Switch
                          id="web-app"
                          checked={formData.applicationTypes.includes(type)}
                          onCheckedChange={() => handleApplicationTypes(type)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assets */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Assets
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newAsset.name}
                      onChange={(e) =>
                        setNewAsset((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Asset name (e.g., Main Application)"
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
                      placeholder="Asset URL"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddAsset}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.assets.length > 0 && (
                    <div className="space-y-3">
                      {formData.assets.map((asset) => (
                        <div
                          key={asset.unique}
                          className="p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
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
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAsset(asset.unique)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
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
                    <Label className="flex items-center gap-2">
                      {section.label}
                    </Label>
                    <div className="flex gap-2">
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
                    {section.items.length > 0 && (
                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <div
                            key={item.unique}
                            className="flex items-center justify-between bg-muted/50 p-3 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${section.dotColor} mt-2 flex-shrink-0`}
                              ></div>
                              <span>{item.description}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveDetails(item.unique)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Bounties */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Bounty Rewards Structure
                  </Label>

                  <div className="space-y-4">
                    {/* Reward Type */}
                    <div className="space-y-2">
                      <Label>Reward Type</Label>
                      <RadioGroup
                        value={formData.rewardType}
                        onValueChange={(rewardType: REWARD_TYPE) =>
                          setFormData({
                            ...formData,
                            rewardType,
                          })
                        }
                        className="flex gap-6"
                      >
                        {rewardTypesData.map(({ type, Icon }) => (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={type} id={type} />
                            <Label
                              htmlFor={type}
                              className="flex items-center gap-1"
                            >
                              <Icon className="h-4 w-4" />
                              {type}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Bounties */}
                    <div className="space-y-3">
                      {formData.bounties.map((reward) => (
                        <div
                          key={reward.type}
                          className="p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold capitalize text-foreground">
                              {reward.type}
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(formData.rewardType === REWARD_TYPE.Bounty ||
                              formData.rewardType === REWARD_TYPE.Mixed) && (
                              <div className="space-y-2">
                                <Label className="flex items-center gap-1 text-sm">
                                  <DollarSign className="h-3 w-3" />
                                  Money Reward
                                </Label>
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
                                  className="text-sm"
                                />
                              </div>
                            )}
                            {(formData.rewardType === REWARD_TYPE.Points ||
                              formData.rewardType === REWARD_TYPE.Mixed) && (
                              <div className="space-y-2">
                                <Label className="flex items-center gap-1 text-sm">
                                  <Trophy className="h-3 w-3" />
                                  Points Reward
                                </Label>
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
                                  className="text-sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as PROGRAM_STATUS,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PROGRAM_STATUS.Active}>
                        Active
                      </SelectItem>
                      <SelectItem value={PROGRAM_STATUS.Paused}>
                        Paused
                      </SelectItem>
                      <SelectItem value={PROGRAM_STATUS.Closed}>
                        Closed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Members */}
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
