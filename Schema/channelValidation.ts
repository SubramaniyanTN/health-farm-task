import { z } from "zod";

export const channelValidation = z.object({
    name: z.string().min(1, { message: "Name is required" }),
})

export type ChannelValidationType = z.infer<typeof channelValidation>;