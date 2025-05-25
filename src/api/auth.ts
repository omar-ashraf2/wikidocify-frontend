import api from "./axios";

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const signup = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/register", data);

export const getMe = () => api.get("/user/me");

export const refreshToken = (refreshToken: string) =>
  api.post("/auth/refresh", { refreshToken });
