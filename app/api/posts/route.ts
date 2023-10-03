import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/error-response";
import { getAuthSession } from "@/lib/nextauth";
import { populateUserResponse } from "@/lib/utils";
import { ApiResponse } from "@/types/api-response";
import { PostWithUserWithLikesWithRetweets, PostWithUserWithLikesWithRetweetsAtServer } from "@/types";
import { createPostSchema } from "@/validators/post";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { Post } from "@prisma/client";

const POSTS_TAKE = 10;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");

        let posts: PostWithUserWithLikesWithRetweetsAtServer[] = [];

        if (cursor) {
            posts = await prisma.post.findMany({
                skip: 1, // skip the cursor
                take: POSTS_TAKE,
                cursor: { id: cursor },
                include: { author: true, likes: true, retweets: true },
                orderBy: { createdAt: "desc" },
            });
        } else {
            posts = await prisma.post.findMany({
                take: POSTS_TAKE,
                include: { author: true, likes: true, retweets: true },
                orderBy: { createdAt: "desc" },
            });
        }

        let nextCursor = null;

        if (posts.length === POSTS_TAKE) {
            // 1-if there are less than MESSAGES_BATCH amoun then it means
            // we are at the end of pagination
            // 2-if it is equals to MESSAGES_BATCH then we get the last one's id
            nextCursor = posts[POSTS_TAKE - 1].id;
        }

        const postsWithUserResponse = posts.map((post) => {
            return {
                ...post,
                author: populateUserResponse(post.author),
            };
        });

        const response: ApiResponse<{
            posts: PostWithUserWithLikesWithRetweets[];
            nextCursor: string | null;
        }> = {
            status: "success",
            data: {
                posts: postsWithUserResponse,
                nextCursor,
            },
        };
        return NextResponse.json(response);
    } catch (err) {
        return ErrorResponse.serverError(req, err);
    }
}

export async function POST(req: Request, _res: Response) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return ErrorResponse.authenticationError(req);
        }

        const json = await req.json();
        const { body, imageUrl } = createPostSchema.parse(json);
        if (!body && !imageUrl) {
            return ErrorResponse.badRequest(
                req,
                "Empty post creation is now allowed."
            );
        }

        const post = await prisma.post.create({
            data: {
                imageUrl,
                body,
                authorId: session.user.id,
            },
        });

        const response: ApiResponse<Post> = {
            data: post,
            status: "success",
        };
        return NextResponse.json(response, { status: HttpStatusCode.Created });
    } catch (err) {
        return ErrorResponse.serverErrorWithZod(req, err);
    }
}
