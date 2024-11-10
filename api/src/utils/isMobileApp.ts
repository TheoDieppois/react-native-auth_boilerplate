import { Request } from "express";

export const isMobileApp = (req: Request) => {
  return req.header("X-Client-Type") === "react-native";
};
