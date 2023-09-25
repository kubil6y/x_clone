import { UserResponse } from "@/types";
import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function populateUserResponse(user: User): UserResponse {
    const userResponse: UserResponse = {
        id: user.id,
        email: user.email ?? "",
        description: user.description ?? null,
        emailVerified: user.emailVerified ?? null,
        username: user.username ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        image: user.image ?? null,
        name: user.name ?? null,
    };
    return userResponse;
}
