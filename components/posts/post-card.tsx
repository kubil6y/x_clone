"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { PostWithUserWithLikes } from "@/types";
import { UserAvatar } from "../user-avatar";
import { formatDistance } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { FollowButton } from "../follow-button";
import { useMutation } from "@tanstack/react-query";
import { LikePostSchema } from "@/validators/like";
import { Session } from "next-auth";
import { useToast } from "../ui/use-toast";

interface PostCardProps {
    post: PostWithUserWithLikes;
    session: Session | null;
}

export const PostCard = ({ post, session }: PostCardProps) => {
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    const { toast } = useToast();

    useEffect(() => {
        const hasLiked = post.likes.find(
            (like) => like.userId === session?.user?.id
        );
        if (hasLiked) {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
        setLikeCount(post?.likes?.length ?? 0);
    }, [post]);

    const timeAgo = useMemo(() => {
        return formatDistance(new Date(post.createdAt), new Date(), {
            addSuffix: true,
        });
    }, [post]);

    const likeMutation = useMutation({
        mutationFn: async () => {
            const payload: LikePostSchema = {
                postId: post.id,
            };
            const response = await axios.post("/api/posts/like", payload);
            return response.data;
        },
        onMutate: () => {
            if (hasLiked) {
                setLikeCount(Math.min(0, likeCount - 1));
            } else {
                setLikeCount((x) => x + 1);
            }
            setHasLiked((b) => !b);
        },
        onError: () => {
            if (hasLiked) {
                setLikeCount(Math.min(0, likeCount - 1));
            } else {
                setLikeCount((x) => x + 1);
            }
            setHasLiked((b) => !b);

            toast({
                title: "Something went wrong.",
                description: "Your vote was not registered. Please try again.",
                variant: "destructive",
            });
        },
    });

    return (
        <div className="flex w-full p-4 hover:bg-zinc-100 dark:hover:bg-accent transition">
            {/* AVATAR */}
            <HoverCard>
                <HoverCardTrigger>
                    <UserAvatar user={post.author} isClickable />
                </HoverCardTrigger>
                <HoverCardContent className="relative min-w-[320px]">
                    <div className="rounded-xl w-full">
                        <UserAvatar user={post.author} isClickable />

                        <div className="ml-1">
                            <p className="text-lg font-semibold capitalize mt-2">
                                {post.author.name}
                            </p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                @{post.author.username}
                            </p>
                            {post.author.description && (
                                <p className="text-sm mt-1">
                                    {post.author.description}
                                </p>
                            )}
                        </div>
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

                {/* POST BODY */}
                <Link href={`/${post.author.username}/status/${post.id}`}>
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

                {/* POST ACTIONS */}
                <div className="flex items-center justify-between">
                    <div>comment</div>
                    <div>retweet</div>
                    <div onClick={() => likeMutation.mutate()}>
                        {hasLiked ? "dislike" : "like"} {likeCount}
                    </div>
                    <div>bookmark</div>
                </div>
            </div>
        </div>
    );
};
