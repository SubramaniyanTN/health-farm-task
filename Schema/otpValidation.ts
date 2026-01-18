import { z } from "zod"
import { emailSchema } from "./signInValidation"
export const otpSchema = z.string().min(8, "OTP must be at least 6 characters")

export const otpVerifyValidation = z.object({
    email: emailSchema,
    otp: otpSchema
  })
  export type OtpVerifyValidationType = z.infer<typeof otpVerifyValidation>