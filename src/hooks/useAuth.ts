import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { login, signup } from "../api/auth";
import { useAuthContext } from "../context/AuthProvider";
import { setTokens } from "../utils/storage";

export const useLogin = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { user, tokens } = res.data;
      setTokens(tokens.access.token, tokens.refresh.token);
      setUser(user);
    },
    onError: (err: AxiosError) => {
      const errorResponse = err?.response?.data as { error?: string };
      toast(errorResponse?.error || "Error occurred during login");
    },
  });
};

export const useSignup = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      const { user, tokens } = res.data;
      setTokens(tokens.access.token, tokens.refresh.token);
      setUser(user);
    },
    onError: (err: AxiosError) => {
      const errorResponse = err?.response?.data as { error?: string };
      toast(errorResponse?.error || "Error occurred during signup");
    },
  });
};
