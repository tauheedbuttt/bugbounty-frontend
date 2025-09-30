import { TranslationType } from "@/types/translation";
import * as Yup from "yup";

const baseValidationSchema = (t: TranslationType) => ({
  company: Yup.string()
    .matches(
      /^(?:(?:https?:\/\/)?(?:www\.)?)?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.?$/,
      t.common.errors.invalid_url
    )
    .required(t.common.errors.company_is_required),
  description: Yup.string()
    .required(t.common.errors.description_is_required)
    .test("not-empty", t.common.errors.description_is_required, (value) => {
      return value && value.trim().length > 0;
    }),
  applicationTypes: Yup.array().min(
    1,
    t.common.errors.at_least_one_application_type_required
  ),
});

export const programCreateValidationSchema = (t: TranslationType) =>
  Yup.object().shape({
    ...baseValidationSchema(t),
    members: Yup.array().min(1, t.common.errors.at_least_one_member_required),
  });

export const programEditValidationSchema = (t: TranslationType) =>
  Yup.object().shape({
    ...baseValidationSchema(t),
  });
