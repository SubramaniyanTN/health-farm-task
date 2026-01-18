import { z } from "zod"
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
export const signInValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema
})

export type SignInValidationType = z.infer<typeof signInValidation>