import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("First name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be 50 characters or less")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be 50 characters or less")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .required("Last name is required"),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be 30 characters or less")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms of Service and Privacy Policy")
    .required("You must agree to the Terms of Service and Privacy Policy"),
});

export const passwordChangeValidationSchema = Yup.object({
  old_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    )
    .required("Old Password is required"),
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    )
    .required("New Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const passwordChangeForgotValidationSchema = Yup.object({
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    )
    .required("New Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password"),
});
