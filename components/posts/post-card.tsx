"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import Image from "next/image";
import { PostWithUserResponse } from "@/types";
import { UserAvatar } from "../user-avatar";
import { formatDistance } from "date-fns";
import { useMemo } from "react";
import { FollowButton } from "../follow-button";

interface PostCardProps {
    post: PostWithUserResponse;
}

export const PostCard = ({ post }: PostCardProps) => {
    const timeAgo = useMemo(() => {
        return formatDistance(new Date(post.createdAt), new Date(), {
            addSuffix: true,
        });
    }, [post]);
    return (
        <div className="flex w-full p-4 hover:bg-zinc-100 transition">
            {/* AVATAR */}
            <HoverCard>
                <HoverCardTrigger>
                    <UserAvatar user={post.author} isClickable />
                </HoverCardTrigger>
                <HoverCardContent className="relative min-w-[320px]">
                    <div className="rounded-xl w-full">
                        <UserAvatar user={post.author} isClickable />

                        <p className="text-lg font-semibold capitalize mt-2">
                            {post.author.name}
                        </p>
                        <p className="text-lg font-semibold capitalize mt-1 text-zinc-600 dark:text-zinc-400">
                            {post.author.username}
                        </p>
                    </div>
                    <div className="absolute right-4 top-4">
                        <FollowButton userId={post.author.id} />
                    </div>
                </HoverCardContent>
            </HoverCard>

            {/* CONTENT */}
            <div className="w-full ml-3">
                {/* top section */}
                <div className="flex items-baseline justify-start text-xs text-zinc-600 dark:text-zinc-400 my-0">
                    <Link
                        href={`/${post.author.username}`}
                        className="font-semibold text-base capitalize text-slate-900 dark:text-white hover:underline"
                    >
                        {post.author?.name ?? post.author.username}
                    </Link>
                    <Link
                        href={`/${post.author.username}`}
                        className="text-sm ml-2"
                    >
                        @{post.author.username}
                    </Link>
                    <span className="mx-1">·</span>
                    <Link
                        href={`/${post.author.username}/status/${post.id}`}
                        className="flex-1"
                    >
                        {timeAgo}
                    </Link>
                </div>

                {/* post body */}
                <Link
                    href={`/${post.author.username}/status/${post.id}`}
                >
                    <p className="mt-1/2 mb-1">{post.body}</p>

                    {post.imageUrl && (
                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={post.imageUrl}
                                width={500}
                                height={500}
                                alt="post image"
                                className="object-cover"
                            />
                        </div>
                    )}
                </Link>
            </div>
        </div>
    );
};
