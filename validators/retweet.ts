import { z } from "zod";

export const retweetPostSchema = z.object({
    postId: z.string().min(1),
});

export type RetweetPostSchema = z.infer<typeof retweetPostSchema>;
