import { z } from "zod";

export const likePostSchema = z.object({
    postId: z.string().min(1),
});

export type LikePostSchema = z.infer<typeof likePostSchema>;
