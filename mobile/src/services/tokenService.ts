import * as SecureStore from "expo-secure-store";

export const TokenService = {
  getAccessToken: () => SecureStore.getItemAsync("accessToken"),
  getRefreshToken: () => SecureStore.getItemAsync("refreshToken"),
  setAccessToken: (token: string) =>
    SecureStore.setItemAsync("accessToken", token),
  setRefreshToken: (token: string) =>
    SecureStore.setItemAsync("refreshToken", token),
  setTokens: async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  },
  clearTokens: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  },
};
