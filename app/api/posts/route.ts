import { ErrorResponse } from "@/lib/error-response";
import { getAuthSession } from "@/lib/nextauth";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types/api-response";
import { createPostSchema } from "@/validators/post";
import { Post } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

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
