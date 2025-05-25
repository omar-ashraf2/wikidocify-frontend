import { refreshToken as refreshTokenApi } from "@/api/auth";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/utils/storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

let isRefreshing = false;
type FailedReq = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedReq[] = [];

const runQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token!)
  );
  failedQueue = [];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    if (!config.headers)
      config.headers = {} as import("axios").AxiosRequestHeaders;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: true;
    };

    if (!original || original._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await refreshTokenApi(refresh);
      const newAccess = data.access.token;
      const newRefresh = data.refresh?.token ?? refresh;
      setTokens(newAccess, newRefresh);

      runQueue(null, newAccess);
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (err) {
      runQueue(err, null);
      clearTokens();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
