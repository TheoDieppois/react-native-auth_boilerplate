import { api } from "@/src/libs/axios";
import { SignInCredentials, SignUpCredentials } from "@/src/types/user";

export const geCurrentUser = async () => {
  const response = await api.get("/auth/me");

  //TODO: parse the response with zod schema

  return response.data;
};

export const signIn = async ({ email, password }: SignInCredentials) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  //TODO: parse the response with zod schema

  return response.data;
};

export const signUp = async ({ name, email, password }: SignUpCredentials) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  //TODO: parse the response with zod schema

  return response.data;
};

export const signOut = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
