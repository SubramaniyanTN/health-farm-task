import { z } from 'zod'
import { passwordSchema, signInValidation } from './signInValidation'

export const formValidation = z
.object({
  fullName: z.string().min(2).max(25),
  phoneNumber: z
    .string()
    .max(10)
    .refine((arg) => !isNaN(Number(arg)), {
      message: "Enter only numbers",
    }),
  confirmPassword: passwordSchema, // 👈 SAME RULE
  gender: z.enum(["male", "female"]),
  country: z.string(),
})
.merge(signInValidation) // email + password
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type FormValidationType = z.infer<typeof formValidation>