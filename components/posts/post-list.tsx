"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import queryString from "query-string";
import { Fragment } from "react";
import { useInView } from "react-intersection-observer";

interface PostListProps { }

// https://tanstack.com/query/v4/docs/react/examples/react/load-more-infinite-scroll
export const PostList = ({ }: PostListProps) => {
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
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
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

    console.log(data);

    return (
        <div>
            <h1>Infinite Loading</h1>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "error" ? (
                <pre>{JSON.stringify(error, null, 2)}</pre>
            ) : (
                <>
                    <div>
                        <button
                            onClick={() => fetchPreviousPage()}
                            disabled={
                                !hasPreviousPage || isFetchingPreviousPage
                            }
                        >
                            {isFetchingPreviousPage
                                ? "Loading more..."
                                : hasPreviousPage
                                    ? "Load Older"
                                    : "Nothing more to load"}
                        </button>
                    </div>
                    {/*
                      *{data.pages.map((page) => (
                      *    <Fragment key={page.nextId}>
                      *        {page.data.map((project) => (
                      *            <p
                      *                style={{
                      *                    border: "1px solid gray",
                      *                    borderRadius: "5px",
                      *                    padding: "10rem 1rem",
                      *                    background: `hsla(${project.id * 30
                      *                        }, 60%, 80%, 1)`,
                      *                }}
                      *                key={project.id}
                      *            >
                      *                {project.name}
                      *            </p>
                      *        ))}
                      *    </Fragment>
                      *))}
                      */}
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
            <Link href="/about">
                Go to another page
            </Link>
        </div>
    );
};
