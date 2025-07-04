import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AtSign,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidationSchema } from "@/validations/auth";
import { ROLE_TYPES } from "@/lib/enums";
import { useAuth } from "../hooks/apis/use-auth";
import { useDebounce } from "@uidotdev/usehooks";
import { UsernameStatus } from "@/types/auth";

export default function HackerSignup() {
  const {
    useSignup,
    useUsername,
    usernameStatus: usernameStatusState,
    usernameError,
    setUsernameStatus,
    setUsernameError,
  } = useAuth(ROLE_TYPES.Hacker);

  const { mutate: signup, isPending: isSignupPending } = useSignup;
  const { mutate: findUsername, isPending: isUsernamePending } = useUsername;

  const {
    values: formData,
    setValues: setFormData,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    onSubmit: (values) => {
      if (usernameError) return;
      signup(values);
    },
    validationSchema: signupValidationSchema,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const debounceUsername = useDebounce(formData.username, 1000);
  const noUsernameStatus =
    (touched.username && errors.username) || !formData.username;
  const usernameStatus: UsernameStatus = isUsernamePending
    ? "checking"
    : usernameStatusState;

  // Simulate username availability check
  useEffect(() => {
    if (debounceUsername) findUsername({ username: debounceUsername });
  }, [debounceUsername]);

  const handleGoogleSignup = () => {
    console.log("Google signup for hacker");
    // Handle Google OAuth
  };

  const getUsernameIcon = () => {
    if (noUsernameStatus)
      return <AtSign className="h-4 w-4 text-muted-foreground" />;
    if (usernameError) {
      return <X className="h-4 w-4 text-red-500" />;
    }
    switch (usernameStatus) {
      case "checking":
        return (
          <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
        );
      case "available":
        return <Check className="h-4 w-4 text-green-500" />;
      case "taken":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <AtSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getUsernameMessage = () => {
    if (noUsernameStatus) return null;
    if (usernameError)
      return <p className="text-sm text-red-600">{usernameError}</p>;
    switch (usernameStatus) {
      case "available":
        return <p className="text-sm text-green-600">Username is available!</p>;
      case "taken":
        return (
          <p className="text-sm text-red-600">Username is already taken</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {/* Header */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create Hacker Account
          </CardTitle>
          <p className="text-muted-foreground">Join the bug bounty community</p>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6">
          {/* Google */}
          <Button
            onClick={handleGoogleSignup}
            variant="outline"
            className="w-full"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : undefined
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                    error={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 h-4 w-4">
                  {getUsernameIcon()}
                </div>
                <Input
                  id="username"
                  placeholder="Choose username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                    setUsernameStatus("idle");
                    setUsernameError(undefined);
                  }}
                  className={`pl-10 ${
                    noUsernameStatus
                      ? ""
                      : usernameStatus === "taken" || usernameError
                      ? "border-red-500"
                      : usernameStatus === "available"
                      ? "border-green-500"
                      : ""
                  }`}
                  required
                  error={
                    touched.username && errors.username
                      ? errors.username
                      : undefined
                  }
                />
              </div>
              {getUsernameMessage()}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="pl-10"
                  required
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
              </div>
            </div>

            {/* Passowrd */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pl-10 pr-10"
                  required
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-3 h-4 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="pl-10 pr-10"
                  required
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-3 h-4 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    agreeToTerms: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isSignupPending}
              disabled={
                !formData.agreeToTerms ||
                usernameStatus === "taken" ||
                usernameStatus === "checking"
              }
            >
              Create Account
            </Button>
          </form>

          {/* Login */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/hacker/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
