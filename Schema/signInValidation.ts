import { z } from "zod"
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
export const emailSchema = z.string().email("Invalid email address")
export const signInValidation = z.object({
  email: emailSchema,
  password: passwordSchema
})
export type SignInValidationType = z.infer<typeof signInValidation>