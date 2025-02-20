import { z } from "zod";

export const SignupFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  userName: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  passWord: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  userName: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  passWord: z.string().min(1, { message: "Password field must not be empty." }),
});
