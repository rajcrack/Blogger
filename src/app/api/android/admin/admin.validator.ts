import { z } from "zod";

export const createAdminSchema = z.object({
    userName: z.string(),
    password: z.string()
});


export const updatePostSchemaDelete = z.object({
    id: z.string(),
    isActive: z.boolean()
});