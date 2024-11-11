import { useAuthContext } from "@/src/components/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { user } = useAuthContext();

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return <Stack />;
}
