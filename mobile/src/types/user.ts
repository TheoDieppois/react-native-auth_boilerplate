export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthContextType = {
  user: User | null;
  signOut: () => Promise<void>;
  signIn: (data: AuthTokens & { user: User }) => Promise<void>;
  setUser: (user: User) => void;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type UserCredentials = {
  name: string;
  email: string;
  password: string;
};

export type SignInCredentials = Omit<UserCredentials, "name">;

export type SignUpCredentials = UserCredentials;
