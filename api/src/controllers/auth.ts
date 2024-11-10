import { NextFunction, Request, Response } from "express";
import {
  createUserSchema,
  loginUserSchema,
  usersTable,
} from "../db/schema/users";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { refreshTokensTable } from "../db/schema/refreshTokens";
import { generateToken } from "../utils/generateToken";
import { TOKENS } from "../constants/tokens";
import jwt from "jsonwebtoken";
import { jwtValidator } from "../validators/jwtValidator";
import { AuthError } from "../errors/AuthError";
import { isMobileApp } from "../utils/isMobileApp";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginUserSchema.parse(req.body);

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, data.email));

      if (!user) {
        throw new AuthError(401, "Authentication failed");
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new AuthError(401, "Authentication failed");
      }

      const accessToken = generateToken({
        userId: user.id,
        role: user.role,
        type: TOKENS.ACCESS_TOKEN,
      });

      const refreshToken = generateToken({
        userId: user.id,
        role: user.role,
        type: TOKENS.REFRESH_TOKEN,
      });

      const hashedToken = await bcrypt.hash(refreshToken, 10);

      // Delete any existing refresh tokens for this user
      await db
        .delete(refreshTokensTable)
        .where(eq(refreshTokensTable.userId, user.id));

      await db.insert(refreshTokensTable).values({
        userId: user.id,
        hashedToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      const isMobile = isMobileApp(req);

      if (isMobile) {
        res.json({
          success: true,
          data: { accessToken, refreshToken, user },
        });
      } else {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({
          success: true,
          data: { accessToken, user },
        });
      }
    } catch (error) {
      next(error);
    }
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Even if validateData middleware is used, and the data are normaly valid
      // This method is still necessary to remove key that is not in the schema
      const data = createUserSchema.parse(req.body);

      // TODO: add password complexity requirements
      if (data.password.length < 8) {
        throw new AuthError(400, "Password must be at least 8 characters");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const [user] = await db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
        });

      res.status(201).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      const isMobile = isMobileApp(req);

      if (!isMobile) {
        res.clearCookie("refreshToken");
      }

      if (!token) {
        res.json({
          success: true,
          data: { message: "Logged out successfully" },
        });

        return;
      }

      // Try to decode token even if expired
      const decoded = jwt.decode(token) as { userId?: number };

      if (decoded?.userId) {
        // Clean up refresh tokens if we can get userId
        await db
          .delete(refreshTokensTable)
          .where(eq(refreshTokensTable.userId, decoded.userId));
      }

      res.json({
        success: true,
        data: { message: "Logged out successfully" },
      });
    } catch (error) {
      // Even if token is invalid, clear the cookie
      res.json({
        success: true,
        data: { message: "Logged out successfully" },
      });
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let refreshToken: string;
      if (!isMobileApp(req)) {
        refreshToken = req.cookies.refreshToken;
      } else {
        refreshToken = req.body.refreshToken;
      }

      if (!refreshToken) {
        throw new AuthError(401, "Invalid refresh token");
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      const { userId, role } = jwtValidator.parse(decoded);

      const [refreshTokenData] = await db
        .select()
        .from(refreshTokensTable)
        .where(eq(refreshTokensTable.userId, userId));

      if (!refreshTokenData) {
        throw new AuthError(401, "Invalid refresh token");
      }

      const isTokenValid = await bcrypt.compare(
        refreshToken,
        refreshTokenData.hashedToken
      );

      if (!isTokenValid) {
        throw new AuthError(401, "Invalid refresh token");
      }

      const accessToken = generateToken({
        userId,
        role,
        type: TOKENS.ACCESS_TOKEN,
      });

      res.json({
        success: true,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  },

  test: async (req: Request, res: Response) => {
    console.log(req.header("X-Client-Type"));
    res.json({ message: "Protected route content" });
  },
};
