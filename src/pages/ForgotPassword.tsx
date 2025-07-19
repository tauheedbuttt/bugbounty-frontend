import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/apis/use-auth";
import { ROLE_TYPES } from "@/lib/enums";

export default function ForgotPassword() {
  const { type } = useParams(); // hacker, program, or admin
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getRole = () => {
    switch (type) {
      case "hacker":
        return ROLE_TYPES.Hacker;
      case "program":
        return ROLE_TYPES.Program;
      case "admin":
        return ROLE_TYPES.Admin;
    }
  };

  const { useForgotPassword } = useAuth(getRole());
  const { mutate: forgotPassword, isPending } = useForgotPassword(() => {
    setIsSubmitted(true);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  const getTitle = () => {
    switch (type) {
      case "hacker":
        return "Reset Hacker Password";
      case "program":
        return "Reset Program Password";
      case "admin":
        return "Reset Admin Password";
      default:
        return "Reset Password";
    }
  };

  const getBackLink = () => {
    switch (type) {
      case "hacker":
        return "/hacker/login";
      case "program":
        return "/program/login";
      case "admin":
        return "/admin/login";
      default:
        return "/";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              Check Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <Mail className="h-16 w-16 text-green-600 mx-auto" />
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Click the link in the email to reset your password. If you don't
                see it, check your spam folder.
              </p>
            </div>
            <Link to={getBackLink()}>
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button isLoading={isPending} type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <div className="text-center">
            <Link
              to={getBackLink()}
              className="text-sm text-primary hover:underline flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
