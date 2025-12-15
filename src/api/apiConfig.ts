import { API_BASE_URL } from "@/src/constants/config";
import {
  AUTH_CREDENTIALS_STORAGE_KEY,
  LEGACY_ACCESS_TOKEN_KEY,
} from "@/src/constants/storage";
import { AuthCredentials, authService } from "@/src/domain";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const storedCredentials = window.localStorage.getItem(
    AUTH_CREDENTIALS_STORAGE_KEY
  );
  const legacyAccess = window.localStorage.getItem(
    LEGACY_ACCESS_TOKEN_KEY
  );

  let token = legacyAccess;

  if (!token && storedCredentials) {
    try {
      const parsed = JSON.parse(storedCredentials);
      token = parsed?.accessToken ?? null;
    } catch {
      window.localStorage.removeItem(AUTH_CREDENTIALS_STORAGE_KEY);
    }
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function setAuthorizationHeader(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

type RegisterAuthInterceptorParams = {
  authCredentials: AuthCredentials | null;
  saveCredentials: (credentials: AuthCredentials) => Promise<void> | void;
  onUnauthorized: () => Promise<void> | void;
};

type RetriableRequest = AxiosRequestConfig & { sent?: boolean };

export function registerAuthInterceptor({
  authCredentials,
  saveCredentials,
  onUnauthorized,
}: RegisterAuthInterceptorParams) {
  const interceptor = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const responseStatus = error?.response?.status;
      const requestConfig: RetriableRequest | undefined = error?.config;

      if (responseStatus !== 401 || !requestConfig) {
        return Promise.reject(error);
      }

      const refreshToken = authCredentials?.refreshToken;
      const isRefreshTokenRequest = authService.isRefreshTokenRequest(
        requestConfig.url
      );

      if (!refreshToken || isRefreshTokenRequest || requestConfig.sent) {
        await onUnauthorized();
        return Promise.reject(error);
      }

      requestConfig.sent = true;

      try {
        const newCredentials = await authService.refreshAccessToken(
          refreshToken
        );
        await saveCredentials(newCredentials);

        requestConfig.headers = {
          ...requestConfig.headers,
          Authorization: `Bearer ${newCredentials.accessToken}`,
        };

        return api(requestConfig);
      } catch (refreshError) {
        await onUnauthorized();
        return Promise.reject(refreshError);
      }
    }
  );

  return () => api.interceptors.response.eject(interceptor);
}
