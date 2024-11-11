export const ACCESS_TOKEN_EXPIRY = "15min"; // 15 minutes
export const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const TOKENS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};
