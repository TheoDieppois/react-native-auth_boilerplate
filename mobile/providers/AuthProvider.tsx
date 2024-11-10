import { PropsWithChildren, useLayoutEffect } from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "X-Client-Type": "react-native",
  },
});

type ConfigAxios = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type AuthProviderProps = PropsWithChildren<{}>;

const AuthProvider = ({ children }: AuthProviderProps) => {
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      async (config: ConfigAxios) => {
        const token = await SecureStore.getItemAsync("accessToken");

        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, []);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest: ConfigAxios = error.config;

        if (error.response.status === 401) {
          try {
            const refreshToken = await SecureStore.getItemAsync("refreshToken");

            const { data } = await api.post("/auth/refresh", {
              refreshToken,
            });

            const accessToken = data.data.accessToken;

            await SecureStore.setItemAsync("accessToken", accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch (error) {
            console.log("Refresh token failed");
            console.log(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return children;
};

export default AuthProvider;
