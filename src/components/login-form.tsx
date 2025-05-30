import GitHubIcon from "@/assets/GitHubIcon";
import GoogleIcon from "@/assets/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface LoginFormProps
  extends Omit<React.ComponentPropsWithoutRef<"form">, "onChange"> {
  values?: {
    email: string;
    password: string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  className,
  values,
  onChange,
  onGoogleLogin,
  onGithubLogin,
  onSubmit,
  isLoading,
  ...props
}: LoginFormProps) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={values?.password || ""}
            onChange={onChange}
          />
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Login"
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
          onClick={onGithubLogin}
        >
          <GitHubIcon className="mr-2 h-4 w-4" />
          Login with GitHub
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onGoogleLogin}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <NavLink to="/signup" className="underline underline-offset-4">
          Sign up
        </NavLink>
      </div>
    </form>
  );
}
