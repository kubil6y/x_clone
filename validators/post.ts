import { z } from "zod";

export const createPostSchema = z.object({
    body: z.string().optional(),
    fileUrl: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
