import GitHubIcon from "@/assets/GitHubIcon";
import GoogleIcon from "@/assets/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SignUpFormProps {
  className?: string;
  values?: {
    name: string;
    email: string;
    password: string;
    confirm: string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGoogleSignUp?: () => void;
  onGithubSignUp?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  [key: string]: unknown;
  isLoading?: boolean;
}

export function SignUpForm({
  className,
  values,
  onChange,
  onGoogleSignUp,
  onGithubSignUp,
  onSubmit,
  isLoading,
  ...props
}: SignUpFormProps) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={values?.name || ""}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={values?.email || ""}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={values?.password || ""}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            required
            minLength={6}
            value={values?.confirm || ""}
            onChange={onChange}
          />
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign up"
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onGithubSignUp}
        >
          <GitHubIcon className="mr-2 h-4 w-4" />
          Sign up with GitHub
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onGoogleSignUp}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <NavLink to="/login" className="underline underline-offset-4">
          Login
        </NavLink>
      </div>
    </form>
  );
}
