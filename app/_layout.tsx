import { Stack } from "expo-router";

export default function RootLayout() {
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
