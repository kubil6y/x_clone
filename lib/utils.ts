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
        username: user.username ?? null,
        image: user.image ?? null,
        name: user.name ?? null,
        createdAt: user.createdAt,
    };
    return userResponse;
}
