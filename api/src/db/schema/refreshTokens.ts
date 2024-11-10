import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "./users";

export const refreshTokensTable = pgTable("refresh_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  hashedToken: varchar({ length: 255 }).notNull().unique(), // Store hashed version
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const createRefreshTokenSchema = createInsertSchema(
  refreshTokensTable
).omit({
  id: true,
  createdAt: true,
});
