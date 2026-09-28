import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, {
    error: "Nome precisa ter no minimo 2 caracteres",
  }),

  email: z.email("Email Inválido"),

  password: z.string().min(8, "A senha deve ter pelomenos 8 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
