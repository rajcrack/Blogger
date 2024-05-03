import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    image: z.string(),
    isActive: z.boolean().optional(),
    tags: z.string().array().optional()
});