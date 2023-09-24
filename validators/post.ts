import { z } from "zod";

export const createPostSchema = z.object({
    body: z.string().optional(),
    imageUrl: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
