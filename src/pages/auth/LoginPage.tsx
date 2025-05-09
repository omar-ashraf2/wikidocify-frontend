import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 min-h-svh w-full">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login.jpg"
          alt="Login"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Home
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              onGithubLogin={() => (window.location.href = "/api/auth/github")}
              onGoogleLogin={() => (window.location.href = "/api/auth/google")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
