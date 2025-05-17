import api from "./axios";

export const login = (data: { email: string; password: string }) =>
  api.post("/api/v1/auth/login", data);

export const signup = (data: { name: string; email: string; password: string }) =>
  api.post("/api/v1/auth/register", data);

export const getMe = () => api.get("/api/v1/auth/me");

export const refreshToken = (refreshToken: string) =>
  api.post("/api/v1/auth/refresh", { refreshToken });
