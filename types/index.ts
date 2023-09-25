import { Post } from "@prisma/client";

export type UserResponse = {
    id: string;
    email: string;
    description: string | null;
    emailVerified: Date | null;
    name: string | null;
    username: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type PostWithUserResponse = Post & { author: UserResponse };
