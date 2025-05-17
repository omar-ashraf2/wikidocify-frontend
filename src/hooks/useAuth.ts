import { login, signup } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
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
  });
};
