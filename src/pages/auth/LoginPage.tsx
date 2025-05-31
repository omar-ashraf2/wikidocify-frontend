import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/useAuth";
import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(form, {
      onSuccess: () => navigate("/"),
    });
  };

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
          <NavLink to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Home
          </NavLink>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              isLoading={login.isPending}
              onSubmit={handleSubmit}
              onChange={handleChange}
              values={form}
              onGithubLogin={() => (window.location.href = "/api/auth/github")}
              onGoogleLogin={() => (window.location.href = "/api/auth/google")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
