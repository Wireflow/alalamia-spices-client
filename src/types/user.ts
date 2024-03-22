import z from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInType = z.infer<typeof UserSchema>;
