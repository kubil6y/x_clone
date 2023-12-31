"use client";

import queryString from "query-string";
import { PostWithUserWithLikesWithRetweets } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./post-card";
import { Session } from "next-auth";

interface PostListProps {
    session: Session | null;
}

// https://tanstack.com/query/v4/docs/react/examples/react/load-more-infinite-scroll
export const PostList = ({ session }: PostListProps) => {
    const { ref, inView } = useInView();

    async function fetchMessages({ pageParam = undefined }) {
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

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => {
            if (lastPage.status === "success") {
                return lastPage.data.nextCursor;
            }
            return undefined;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <div>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "error" ? (
                <pre>{JSON.stringify(error, null, 2)}</pre>
            ) : (
                <>
                    {data.pages.map((page) => {
                        if (page?.status === "success") {
                            return page.data.posts.map(
                                (post: PostWithUserWithLikesWithRetweets) => {
                                    return (
                                        <Fragment key={post.id}>
                                            <PostCard
                                                post={post}
                                                session={session}
                                            />
                                        </Fragment>
                                    );
                                }
                            );
                        }
                        return null;
                    })}

                    <div>
                        <button
                            ref={ref}
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? "Loading more..."
                                : hasNextPage
                                    ? "Load Newer"
                                    : "Nothing more to load"}
                        </button>
                    </div>
                    <div>
                        {isFetching && !isFetchingNextPage
                            ? "Background Updating..."
                            : null}
                    </div>
                </>
            )}
            <hr />
        </div>
    );
};
