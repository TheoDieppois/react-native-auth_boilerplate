import { PropsWithChildren, useState } from "react";
import { createContext, useContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthContextType } from "@/src/types/user";
import { useAuthInterceptors } from "@/src/hooks/useAuthInterceptors";
import { useInitialUser } from "@/src/hooks/useInitialUser";
import { useSplashScreen } from "@/src/hooks/useSplashScreen";
import { useAuth } from "@/src/hooks/useAuth";

const AuthContext = createContext<AuthContextType | null>(null);

SplashScreen.preventAutoHideAsync();

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const { signIn, signOut, user, setUser } = useAuth();

  useAuthInterceptors(signOut);
  useInitialUser(setUser, setIsLoading);
  useSplashScreen(isLoading);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};

export default AuthProvider;
