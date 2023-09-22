import { UserResponse } from "@/types/user-response";
import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function populateUserResponse(user: User): UserResponse {
    const userResponse: UserResponse = {
        id: user.id,
        email: user.email ?? "",
        emailVerified: user.emailVerified ?? null,
        username: user.username ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    return userResponse;
}
