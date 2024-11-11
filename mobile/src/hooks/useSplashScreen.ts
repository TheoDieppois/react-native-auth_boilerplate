import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useSplashScreen = (isLoading: boolean) => {
  useEffect(() => {
    const hideSplash = async () => {
      if (!isLoading) {
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          // TODO: Track error in sentry
          console.log("Error hiding splash screen:", error);
        }
      }
    };

    hideSplash();
  }, [isLoading]);
};
