import { useCallback, useState } from "react";
import { User } from "@/src/types/user";
import { TokenService } from "@/src/services/tokenService";
import { router } from "expo-router";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(
    async ({
      accessToken,
      refreshToken,
      user,
    }: {
      accessToken: string;
      refreshToken: string;
      user: User;
    }) => {
      setUser(user);
      await TokenService.setTokens(accessToken, refreshToken);
    },
    []
  );

  const signOut = useCallback(async () => {
    await TokenService.clearTokens();
    setUser(null);
    router.replace("/");
  }, []);

  return {
    user,
    setUser,
    signIn,
    signOut,
  };
};
