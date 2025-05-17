import { getMe, refreshToken } from "../api/auth";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/storage";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch {
      const refresh = getRefreshToken();
      if (refresh) {
        const res = await refreshToken(refresh);
        setTokens(res.data.access.token, res.data.refresh?.token || refresh);
        const me = await getMe();
        setUser(me.data);
      }
    }
  };

  useEffect(() => {
    if (getAccessToken()) fetchUser();
  }, []);

  const logout = () => {
    clearTokens();
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
