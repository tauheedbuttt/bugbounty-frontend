import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { HackerProgramById } from "@/types/hacker/program";
import { useFormik } from "formik";
import { HackerReportCreateData } from "@/types/hacker/report";
import { BOUNTY_TYPE, REPORT_STATUS, REPORT_TYPE } from "@/lib/enums";
import { useReport } from "@/hooks/apis/use-report";
import Notification from "@/components/Notification";
import ReportAttachmentsUpload from "@/components/ReportAttachmentsUpload";

export default function SubmitReport() {
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
      return formData.name && formData.type && formData.summary;
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
          <Button variant="ghost" onClick={() => navigate("/programs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Programs
          </Button>
          <span className="text-muted-foreground">{">"}</span>

          <Button
            variant="ghost"
            onClick={() => navigate(`/programs/${program?._id}`)}
          >
            <span className="text-muted-foreground">{program?.name}</span>
          </Button>
          <span className="text-muted-foreground">{">"}</span>
          <span>Submit Report</span>
        </div>

        {/* Submit Report Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white">
            SR
          </div>
          <div>
            <h1 className="text-2xl font-bold">Submit Report</h1>
            <p className="text-muted-foreground">
              to {program?.name} by {program?.company}
            </p>
          </div>
        </div>

        {/* Quality Banner */}
        <Notification
          title="Quality for Extra Bounty!"
          message="Providing a good quality report will help to increase your bounty!
              Follow the best practices in writing a good quality report."
          buttonText="View Guidelines"
        />

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
            <span className="mx-2 text-sm">Overview</span>

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
            <span className="mx-2 text-sm">Details</span>

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
            <span className="mx-2 text-sm">Attachments</span>
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
                    Title
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    A concise title includes the type of vulnerability and the
                    resulting damage
                  </p>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Title"
                    className="bg-muted/30"
                  />
                </div>

                {/* Domain */}
                <div>
                  <Label htmlFor="domain" className="text-base font-semibold">
                    Domain
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enter the Domain or IP of the attack
                  </p>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) =>
                      handleInputChange("domain", e.target.value)
                    }
                    placeholder="Domain"
                    className="bg-muted/30"
                  />
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type" className="text-base font-semibold">
                    Type
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the type of the potential issue you have discovered
                  </p>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(REPORT_TYPE).map((item) => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary */}
                <div>
                  <Label htmlFor="summary" className="text-base font-semibold">
                    Summary
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    A summary and description of the vulnerability you found
                    within the program's scope
                  </p>
                  <RichTextEditor
                    content={formData.summary}
                    onChange={(content) =>
                      handleInputChange("summary", content)
                    }
                    placeholder="Provide a detailed summary of the vulnerability..."
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* POC */}
                <div>
                  <Label htmlFor="proof" className="text-base font-semibold">
                    Proof of Concept
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add details for how we can reproduce the issue.
                  </p>
                  <RichTextEditor
                    content={formData.proofOfConcept}
                    onChange={(content) =>
                      handleInputChange("proofOfConcept", content)
                    }
                    placeholder="Describe the steps to reproduce the vulnerability..."
                  />
                </div>

                {/* Impact */}
                <div>
                  <Label htmlFor="impact" className="text-base font-semibold">
                    Impact
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    How does this vulnerability affect the program?
                  </p>
                  <RichTextEditor
                    content={formData.impact}
                    onChange={(content) => handleInputChange("impact", content)}
                    placeholder="Explain the potential impact of this vulnerability..."
                  />
                </div>

                {/* Remediation */}
                <div>
                  <Label
                    htmlFor="remediation"
                    className="text-base font-semibold"
                  >
                    Remediation
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Provide the suggested fix of the vulnerability
                  </p>
                  <RichTextEditor
                    content={formData.remediation}
                    onChange={(content) =>
                      handleInputChange("remediation", content)
                    }
                    placeholder="Suggest how to fix this vulnerability..."
                  />
                </div>

                {/* Severity */}
                <div>
                  <Label htmlFor="severity" className="text-base font-semibold">
                    Severity
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the severity level you believe this vulnerability has
                  </p>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) =>
                      handleInputChange("severity", value)
                    }
                  >
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select severity" />
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
                      I hereby confirm that I have read the Terms and Conditions
                      and Privacy and Security Policy.
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
                      I hereby agree not to disclose or use any confidential
                      information belonging to the other party for any reason
                      which is not stated in terms and conditions.
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
                      I hereby agree to have the report evaluated by the
                      platform and the bounty will be determined based on the
                      severity of the bug, impact and quality of the report.
                    </Label>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
                  By clicking "Submit Report", you indicate that you have read
                  the Program info, agree to the Terms & Conditions and
                  acknowledge that you have read the Privacy and Security
                  Policy.
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
                ? () => navigate(`/programs/${id}`)
                : handlePrevious
            }
            type="button"
          >
            {currentStep === 1 ? "Back to program" : "Previous"}
          </Button>

          <Button
            isLoading={isPending}
            disabled={!canProceed() || isPending}
            type="submit"
          >
            {currentStep === 3 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
