import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Email is invalid" }),
    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(2, {
            message: "Username must be at least 2 characters",
        })
        .max(24, {
            message: "Username must not exceed 24 characters",
        })
        .refine(
            (data) => {
                return !data.includes("@");
            },
            { message: "Username must not include '@' symbol" }
        ),
    password: z
        .string()
        .trim()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(32, { message: "Password must not exceed 32 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
