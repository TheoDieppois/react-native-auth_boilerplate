import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  TOKENS,
} from "../constants/tokens";

type TokenType = {
  userId: number;
  role: string;
  type: string;
};

export const generateToken = ({ userId, role, type }: TokenType) => {
  const secret =
    type === TOKENS.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  const expiry =
    type === TOKENS.ACCESS_TOKEN ? ACCESS_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY;

  return jwt.sign({ userId, role }, secret, {
    expiresIn: expiry,
  });
};
