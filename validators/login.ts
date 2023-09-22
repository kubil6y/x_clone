import { z } from "zod";

export const loginSchema = z.object({
    usernameOrEmail: z
        .string()
        .trim()
        .toLowerCase()
        .min(2, { message: "Please enter your email address your username" }),

    password: z
        .string()
        .trim()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(32, { message: "Password must not exceed 32 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
