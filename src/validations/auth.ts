import { TranslationType } from "@/types/translation";
import * as Yup from "yup";

export const loginValidationSchema = (t: TranslationType) =>
  Yup.object({
    email: Yup.string()
      .min(
        2,
        t.common.errors.must_be_at_least_characters.replace("{count}", "2")
      )
      .max(
        50,
        t.common.errors.must_be_characters_or_less.replace("{count}", "50")
      )
      .required(t.common.errors.email_is_required),
    password: Yup.string()
      .min(
        8,
        t.common.errors.password_must_be_at_least_characters.replace(
          "{count}",
          "8"
        )
      )
      .required(t.common.errors.password_is_required),
  });

export const signupValidationSchema = (t: TranslationType) =>
  Yup.object({
    firstName: Yup.string()
      .min(
        2,
        t.common.errors.first_name_must_be_at_least_characters.replace(
          "{count}",
          "2"
        )
      )
      .max(
        50,
        t.common.errors.first_name_must_be_characters_or_less.replace(
          "{count}",
          "50"
        )
      )
      .matches(/^[a-zA-Z\s]+$/, t.common.errors.first_name_letters_spaces)
      .required(t.common.errors.first_name_is_required),

    lastName: Yup.string()
      .min(
        2,
        t.common.errors.last_name_must_be_at_least_characters.replace(
          "{count}",
          "2"
        )
      )
      .max(
        50,
        t.common.errors.last_name_must_be_characters_or_less.replace(
          "{count}",
          "50"
        )
      )
      .matches(/^[a-zA-Z\s]+$/, t.common.errors.last_name_letters_spaces)
      .required(t.common.errors.last_name_is_required),

    username: Yup.string()
      .min(
        3,
        t.common.errors.username_must_be_at_least_characters.replace(
          "{count}",
          "3"
        )
      )
      .max(
        30,
        t.common.errors.username_must_be_characters_or_less.replace(
          "{count}",
          "30"
        )
      )
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t.common.errors.username_letters_numbers_underscores
      )
      .required(t.common.errors.username_is_required),

    email: Yup.string()
      .email(t.common.errors.email_invalid)
      .required(t.common.errors.email_is_required),

    password: Yup.string()
      .min(
        8,
        t.common.errors.password_must_be_at_least_characters.replace(
          "{count}",
          "8"
        )
      )
      .matches(/[a-z]/, t.common.errors.password_must_lowercase)
      .matches(/[A-Z]/, t.common.errors.password_must_uppercase)
      .matches(/[0-9]/, t.common.errors.password_must_number)
      .matches(/[@$!%*?&]/, t.common.errors.password_must_special)
      .required(t.common.errors.password_is_required),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t.common.errors.passwords_must_match)
      .required(t.common.errors.please_confirm_your_password),

    agreeToTerms: Yup.boolean()
      .oneOf([true], t.common.errors.agree_terms_required)
      .required(t.common.errors.agree_terms_required),
  });

const oldPasswordValidationSchema = (t: TranslationType) => ({
  old_password: Yup.string()
    .min(
      8,
      t.common.errors.password_must_be_at_least_characters.replace(
        "{count}",
        "8"
      )
    )
    .matches(/[a-z]/, t.common.errors.password_must_lowercase)
    .matches(/[A-Z]/, t.common.errors.password_must_uppercase)
    .matches(/[0-9]/, t.common.errors.password_must_number)
    .matches(/[@$!%*?&]/, t.common.errors.password_must_special)
    .required(t.common.errors.old_password_is_required),
});

export const passwordChangeValidationSchema = (
  t: TranslationType,
  hasPassword?: boolean
) =>
  Yup.object({
    ...(hasPassword ? oldPasswordValidationSchema(t) : {}),
    new_password: Yup.string()
      .min(
        8,
        t.common.errors.password_must_be_at_least_characters.replace(
          "{count}",
          "8"
        )
      )
      .matches(/[a-z]/, t.common.errors.password_must_lowercase)
      .matches(/[A-Z]/, t.common.errors.password_must_uppercase)
      .matches(/[0-9]/, t.common.errors.password_must_number)
      .matches(/[@$!%*?&]/, t.common.errors.password_must_special)
      .required(t.common.errors.new_password_is_required),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], t.common.errors.passwords_must_match)
      .required(t.common.errors.please_confirm_your_password),
  });

export const passwordChangeForgotValidationSchema = (t: TranslationType) =>
  Yup.object({
    new_password: Yup.string()
      .min(
        8,
        t.common.errors.password_must_be_at_least_characters.replace(
          "{count}",
          "8"
        )
      )
      .matches(/[a-z]/, t.common.errors.password_must_lowercase)
      .matches(/[A-Z]/, t.common.errors.password_must_uppercase)
      .matches(/[0-9]/, t.common.errors.password_must_number)
      .matches(/[@$!%*?&]/, t.common.errors.password_must_special)
      .required(t.common.errors.new_password_is_required),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], t.common.errors.passwords_must_match)
      .required(t.common.errors.please_confirm_your_password),
  });
