import api from "./axios";

export interface TokenPair {
  access: { token: string; expires: string };
  refresh: { token: string; expires: string };
}

export interface AuthResponse {
  tokens: TokenPair;
  user: { id: string; name?: string; email: string };
}

export const login = (data: { email: string; password: string }) =>
  api.post<AuthResponse>("/api/v1/auth/login", data);

export const signup = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/v1/auth/register", data);

export const getMe = () => api.get("/api/v1/user/me");

export const refreshToken = (refreshToken: string) =>
  api.post("/api/v1/auth/refresh", { refreshToken });
