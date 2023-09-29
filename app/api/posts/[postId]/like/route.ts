import { ErrorResponse } from "@/lib/error-response";
import { getAuthSession } from "@/lib/nextauth";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types/api-response";
import { likePostSchema } from "@/validators/like";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, _res: Response) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return ErrorResponse.authenticationError(req);
        }

        const json = await req.json();
        const body = likePostSchema.parse(json);

        const post = await prisma.post.findFirst({
            where: { id: body.postId },
            include: { likes: true },
        });

        if (!post) {
            return ErrorResponse.notFound(req);
        }

        const hasLiked = post.likes.find(
            (like) => like.userId === session.user.id
        );

        if (hasLiked) {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId: session.user.id,
                        postId: body.postId,
                    },
                },
            });
            return new Response(null, { status: HttpStatusCode.NoContent });
        } else {
            await prisma.like.create({
                data: {
                    userId: session.user.id,
                    postId: body.postId,
                },
            });
            const out: ApiResponse<string> = {
                status: "success",
                data: "OK",
            };
            return NextResponse.json(out);
        }
    } catch (err) {
        return ErrorResponse.serverErrorWithZod(req, err);
    }
}
