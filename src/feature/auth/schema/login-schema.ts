import * as z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "A senha deve ter pelomenos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
