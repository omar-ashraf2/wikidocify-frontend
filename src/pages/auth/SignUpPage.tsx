import { GalleryVerticalEnd } from "lucide-react";
import { SignUpForm } from "@/components/signup-form";
import { useState } from "react";
import { useSignup } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const signup = useSignup();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    const { name, email, password } = form;
    signup.mutate(
      { name, email, password },
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login.jpg"
          alt="Sign-up"
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
            <SignUpForm
              isLoading={signup.isPending}
              onSubmit={handleSubmit}
              onChange={handleChange}
              values={form}
              onGithubSignUp={() => (window.location.href = "/api/auth/github")}
              onGoogleSignUp={() => (window.location.href = "/api/auth/google")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
