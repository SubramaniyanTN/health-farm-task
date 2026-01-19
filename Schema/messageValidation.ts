import { z } from "zod";

export const messageValidation = z.object({
    message: z.string().min(1,{message:"Message is required"}),
})

export type MessageValidationType = z.infer<typeof messageValidation>;