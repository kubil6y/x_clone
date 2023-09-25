import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().trim().toLowerCase().min(1, {
        message: "Name must be at least 1 characters",
    }),
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

export const registerFormSchema = z
    .object({
        name: z.string().trim().toLowerCase().min(1, {
            message: "Name must be at least 1 characters",
        }),
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
        confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
