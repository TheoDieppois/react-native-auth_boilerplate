import { useEffect } from "react";
import { TokenService } from "@/src/services/tokenService";
import { geCurrentUser } from "@/src/api/auth";
import { User } from "@/src/types/user";

export const useInitialUser = (
  setUser: (user: User) => void,
  setLoading: (loading: boolean) => void
) => {
  useEffect(() => {
    const loadUser = async () => {
      const accessToken = await TokenService.getAccessToken();

      if (accessToken) {
        try {
          const res = await geCurrentUser();

          setUser(res.data.user);
        } catch (error) {
          console.log("Error loading user:", error);
        }
      }

      setLoading(false);
    };

    loadUser();
  }, [setUser, setLoading]);
};
