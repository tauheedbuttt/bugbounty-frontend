import ReportAttachmentsUpload from "@/components/ReportAttachmentsUpload";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTE_PATHS } from "@/constants/routes";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { BOUNTY_TYPE, REPORT_STATUS, REPORT_TYPE } from "@/lib/enums";
import { HackerProgramById } from "@/types/hacker/program";
import { HackerReportCreateData } from "@/types/hacker/report";
import { useFormik } from "formik";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SubmitReport() {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const program = location?.state?.program as HackerProgramById;

  const { useAddHackerReport } = useReport();
  const { mutate: addReport, isPending } = useAddHackerReport;

  const formik = useFormik<HackerReportCreateData>({
    initialValues: {
      programId: id,
      name: "",
      domain: "",
      impact: "",
      remediation: "",
      proofOfConcept: "",
      summary: "",
      other: "",
      type: REPORT_TYPE.SQLInjection,
      status: REPORT_STATUS.Open,
      severity: program?.severity,
      termsAccepted: false,
      confidentialityAccepted: false,
      evaluationAccepted: false,
      attachments: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      addReport(values);
    },
  });

  const programDetailPath = ROUTE_PATHS.HACKER_PROGRAM_DETAILS.replace(
    ":id",
    id
  );

  const {
    values: formData,
    setValues: setFormData,
    handleSubmit,
    errors,
    touched,
  } = formik;

  const handleInputChange = (
    field: keyof HackerReportCreateData,
    value: any
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return (
        formData.name &&
        formData.type &&
        (formData.type === REPORT_TYPE.Other ? !!formData.other : true) &&
        formData.summary
      );
    }
    if (currentStep === 2) {
      return (
        formData.proofOfConcept &&
        formData.impact &&
        formData.remediation &&
        formData.severity
      );
    }
    if (currentStep === 3) {
      return (
        formData.termsAccepted &&
        formData.confidentialityAccepted &&
        formData.evaluationAccepted
      );
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === 3) handleSubmit(e);
          else handleNext();
        }}
        className="container mx-auto p-6 max-w-4xl"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTE_PATHS.HACKER_PROGRAMS)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.buttons.programs}
          </Button>
          <span className="text-muted-foreground">{">"}</span>

          <Button variant="ghost" onClick={() => navigate(programDetailPath)}>
            <span className="text-muted-foreground">{program?.name}</span>
          </Button>
          <span className="text-muted-foreground">{">"}</span>
          <span>{t.common.buttons.submit_report}</span>
        </div>

        {/* Submit Report Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white">
            SR
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {t.common.buttons.submit_report}
            </h1>
            <p className="text-muted-foreground">
              to {program?.name} by {program?.company}
            </p>
          </div>
        </div>

        {/* Quality Banner */}
        {/* <Notification
          title={t.common.buttons.quality_for_extra_bounty}
          message={t.common.buttons.good_report_increases_bounty}
          buttonText={t.common.buttons.view_guidelines}
        /> */}

        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
            </div>
            <span className="mx-2 text-sm">{t.common.buttons.overview}</span>

            <div className="w-16 h-px bg-border mx-4"></div>

            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : "2"}
            </div>
            <span className="mx-2 text-sm">{t.common.buttons.details}</span>

            <div className="w-16 h-px bg-border mx-4"></div>

            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 3
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="mx-2 text-sm">{t.common.buttons.attachments}</span>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">
                    {t.common.buttons.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.concise_title_guideline}
                  </p>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t.common.buttons.title}
                    className="bg-muted/30"
                  />
                </div>

                {/* Domain */}
                <div>
                  <Label htmlFor="domain" className="text-base font-semibold">
                    {t.common.buttons.domain}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.forms.placeholders.enter_the_domain_or_ip_of_the_attack}
                  </p>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) =>
                      handleInputChange("domain", e.target.value)
                    }
                    placeholder={t.common.buttons.domain}
                    className="bg-muted/30"
                  />
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type" className="text-base font-semibold">
                    {t.forms.placeholders.type}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.select_issue_type_prompt}
                  </p>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder={t.forms.placeholders.type} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(REPORT_TYPE).map((item) => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Other */}
                {formData.type === REPORT_TYPE.Other && (
                  <div>
                    <Label htmlFor="other" className="text-base font-semibold">
                      {t.common.buttons.other}
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t.forms.placeholders.enter_other_type}
                    </p>
                    <Input
                      id="other"
                      value={formData.other}
                      onChange={(e) =>
                        handleInputChange("other", e.target.value)
                      }
                      placeholder={t.common.buttons.other}
                      className="bg-muted/30"
                    />
                  </div>
                )}

                {/* Summary */}
                <div>
                  <Label htmlFor="summary" className="text-base font-semibold">
                    {t.forms.labels.summary}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.vulnerability_summary_description}
                  </p>
                  <RichTextEditor
                    content={formData.summary}
                    onChange={(content) =>
                      handleInputChange("summary", content)
                    }
                    placeholder={t.forms.labels.summary}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* POC */}
                <div>
                  <Label htmlFor="proof" className="text-base font-semibold">
                    {t.common.buttons.proof_of_concept}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.proof_of_concept}
                  </p>
                  <RichTextEditor
                    content={formData.proofOfConcept}
                    onChange={(content) =>
                      handleInputChange("proofOfConcept", content)
                    }
                    placeholder={
                      t.forms.placeholders
                        .describe_the_steps_to_reproduce_the_vulnerability
                    }
                  />
                </div>

                {/* Impact */}
                <div>
                  <Label htmlFor="impact" className="text-base font-semibold">
                    {t.forms.labels.impact}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.how_does_this_vulnerability_affect}
                  </p>
                  <RichTextEditor
                    content={formData.impact}
                    onChange={(content) => handleInputChange("impact", content)}
                    placeholder={
                      t.forms.placeholders
                        .explain_the_potential_impact_of_this_vulnerability
                    }
                  />
                </div>

                {/* Remediation */}
                <div>
                  <Label
                    htmlFor="remediation"
                    className="text-base font-semibold"
                  >
                    {t.forms.labels.remediation}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {
                      t.common.buttons
                        .provide_the_suggested_fix_of_the_vulnerability
                    }
                  </p>
                  <RichTextEditor
                    content={formData.remediation}
                    onChange={(content) =>
                      handleInputChange("remediation", content)
                    }
                    placeholder={
                      t.forms.placeholders.suggest_how_to_fix_this_vulnerability
                    }
                  />
                </div>

                {/* Severity */}
                <div>
                  <Label htmlFor="severity" className="text-base font-semibold">
                    {t.forms.labels.severity}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.common.buttons.select_severity_level_prompt}
                  </p>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) =>
                      handleInputChange("severity", value)
                    }
                  >
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue
                        placeholder={t.forms.placeholders.select_severity}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BOUNTY_TYPE).map((item) => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Attachments */}
                <ReportAttachmentsUpload formik={formik} />

                {/* Terms */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange("termsAccepted", checked)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      {t.common.buttons.confirm_terms_and_privacy}
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="confidentiality"
                      checked={formData.confidentialityAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange("confidentialityAccepted", checked)
                      }
                    />
                    <Label
                      htmlFor="confidentiality"
                      className="text-sm leading-relaxed"
                    >
                      {t.common.buttons.agree_not_disclose_confidential}
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="evaluation"
                      checked={formData.evaluationAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange("evaluationAccepted", checked)
                      }
                    />
                    <Label
                      htmlFor="evaluation"
                      className="text-sm leading-relaxed"
                    >
                      {t.common.buttons.agree_platform_evaluation_bounty}
                    </Label>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
                  {t.common.buttons.submit_report_acknowledgement}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={
              currentStep === 1
                ? () => navigate(programDetailPath)
                : handlePrevious
            }
            type="button"
          >
            {currentStep === 1
              ? t.common.buttons.back_to_program
              : t.common.buttons.previous}
          </Button>

          <Button
            isLoading={isPending}
            disabled={!canProceed() || isPending}
            type="submit"
          >
            {currentStep === 3
              ? t.common.buttons.submit
              : t.common.buttons.next}
          </Button>
        </div>
      </form>
    </div>
  );
}
