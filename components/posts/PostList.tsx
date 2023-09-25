"use client";

import queryString from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

interface PostListProps { }

export const PostList = ({ }: PostListProps) => {
    async function fetchPosts({ pageParam = undefined }) {
        const url = queryString.stringifyUrl(
            {
                url: "/api/posts",
                query: {
                    cursor: pageParam,
                },
            },
            { skipNull: true }
        );

        const res = await fetch(url);
        return res.json();
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: ["posts"],
            queryFn: fetchPosts,
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
        });

    return (
        <div>
            <p>PostList</p>
        </div>
    );
};
