import { getMe, refreshToken as refreshTokenApi } from "@/api/auth";
import { isExpired } from "@/utils/jwt";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/utils/storage";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const runRefresh = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("no refresh token");

    const { data } = await refreshTokenApi(refresh);
    setTokens(data.access.token, data?.refresh?.token ?? refresh);
    return data.access.token;
  };

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    let interval: number | undefined;

    const bootstrap = async () => {
      setIsLoading(true);
      const access = getAccessToken();
      if (!access) {
        setIsLoading(false);
        return;
      }

      if (isExpired(access)) await runRefresh();

      try {
        const me = await getMe();
        setUser(me.data);
      } catch {
        clearTokens();
      }

      setIsLoading(false);

      interval = window.setInterval(async () => {
        const token = getAccessToken();
        if (!token) return;
        if (
          isExpired(token) ||
          Date.now() >= jwtDecode<{ exp: number }>(token).exp * 1000 - 30_000
        ) {
          try {
            await runRefresh();
          } catch {
            logout();
          }
        }
      }, 15_000);
    };

    bootstrap();
    return () => clearInterval(interval);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
};
