import { useAuthContext } from "@/src/components/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { user } = useAuthContext();

  if (user) {
    return <Redirect href="/(main)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signIn"
        options={{
          title: "Connexion",
          headerBackTitle: "Retour",
        }}
      />

      <Stack.Screen
        name="signUp"
        options={{
          title: "Inscription",
          headerBackTitle: "Retour",
        }}
      />
    </Stack>
  );
}
