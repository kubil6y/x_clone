import { Like, Post } from "@prisma/client";

export type UserResponse = {
    id: string;
    email: string;
    description: string | null;
    name: string | null;
    username: string | null;
    image: string | null;
    createdAt: Date;
};

export type PostWithUserWithLikes = Post & {
    author: UserResponse;
    likes: Like[];
};
