import { z } from "zod";

export const searchValidation = z.object({
    search: z.string().max(100, "Search must be less than 100 characters"),
});

export type SearchValidationType = z.infer<typeof searchValidation>;