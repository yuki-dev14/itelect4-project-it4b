import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("That is not an email address."),
  password: z.string().min(8, "At least 8 characters."),
});

export type AuthCredentials = z.infer<typeof authSchema>;

