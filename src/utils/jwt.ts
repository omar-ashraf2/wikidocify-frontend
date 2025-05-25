import { jwtDecode } from "jwt-decode";

export interface JwtPayloadExt {
  exp: number;
  [key: string]: unknown;
}

export const isExpired = (token?: string | null): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<JwtPayloadExt>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};
