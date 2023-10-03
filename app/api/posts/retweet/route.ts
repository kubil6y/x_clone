import { ErrorResponse } from "@/lib/error-response";
import { getAuthSession } from "@/lib/nextauth";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types/api-response";
import { HttpStatusCode } from "@/types/http-status-code";
import { retweetPostSchema } from "@/validators/retweet";
import { NextResponse } from "next/server";

export async function POST(req: Request, _res: Response) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return ErrorResponse.authenticationError(req);
        }

        const json = await req.json();
        const body = retweetPostSchema.parse(json);

        const post = await prisma.post.findFirst({
            where: { id: body.postId },
            include: { retweets: true },
        });

        if (!post) {
            return ErrorResponse.notFound(req);
        }

        const hasRetweeted = post.retweets.find(
            (retweet) => retweet.userId === session.user.id
        );

        if (hasRetweeted) {
            await prisma.retweet.delete({
                where: {
                    userId_postId: {
                        userId: session.user.id,
                        postId: body.postId,
                    },
                },
            });
            return new Response(null, { status: HttpStatusCode.NO_CONTENT });
        } else {
            await prisma.retweet.create({
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
