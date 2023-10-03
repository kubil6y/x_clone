import { Like, Post, Retweet, User } from "@prisma/client";

export type UserResponse = {
    id: string;
    email: string;
    description: string | null;
    name: string | null;
    username: string | null;
    image: string | null;
    createdAt: Date;
};

export type PostWithUserWithLikesWithRetweets = Post & {
    author: UserResponse;
    likes: Like[];
    retweets: Retweet[];
};


export type PostWithUserWithLikesWithRetweetsAtServer = Post & {
    author: User;
    likes: Like[];
    retweets: Retweet[];
};
