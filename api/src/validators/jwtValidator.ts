import { z } from "zod";

export const jwtValidator = z.object({
  userId: z.number(),
  role: z.string(),
  exp: z.number(),
  iat: z.number(),
});
