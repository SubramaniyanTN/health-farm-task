import { z } from 'zod'

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