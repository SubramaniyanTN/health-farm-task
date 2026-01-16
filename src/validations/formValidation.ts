import { z } from 'zod'

// Form Fields - Screen 1
// ·         Full Name
// ·         Email Address – email validation
// ·         Phone Number – Numeric only accept with just 10 digits.
// ·         Password – Should be include eye button, default show ***.
// ·         Confirm Password - Should be include eye button, default show ***.
// ·         Gender (Radio)
// ·         Country (Dropdown)
// ·         Profile upload – only accept image format.
// ·         Terms & Conditions (Checkbox)

export const formValidation = z.object({
    fullName:z.string().max(25).min(2),
    email:z.email(),
    phoneNumber:z.string().max(10).refine((arg)=>!isNaN(Number(arg)),{error:"Enter only number"}),
    password:z.string(),
    confirmPassword:z.string(),
    gender:z.enum(["male","female"]),
    country:z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This specifies which field the error message should be associated with
})

export type FormValidationType = z.infer<typeof formValidation>