import { useLayoutEffect } from "react";
import { api } from "@/src/libs/axios";
import { TokenService } from "@/src/services/tokenService";
import { ConfigAxios } from "@/src/types/axios";

export const useAuthInterceptors = (signOut: () => Promise<void>) => {
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      async (config: ConfigAxios) => {
        const token = await TokenService.getAccessToken();
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;
        return config;
      }
    );

    return () => api.interceptors.request.eject(authInterceptor);
  }, []);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest: ConfigAxios = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.error === "Unauthorized"
        ) {
          try {
            const refreshToken = await TokenService.getRefreshToken();
            const { data } = await api.post("/auth/refresh", { refreshToken });
            await TokenService.setAccessToken(data.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch (error) {
            // TODO: Track error in sentry
            return await signOut();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, [signOut]);
};
