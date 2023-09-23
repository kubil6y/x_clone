import bcrypt from "bcryptjs";
import { registerSchema } from "@/validators/register";
import { ErrorResponse } from "@/lib/error-response";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api-response";
import { UserResponse } from "@/types/user-response";
import { populateUserResponse } from "@/lib/utils";
import { HttpStatusCode } from "axios";

export async function POST(req: Request, _res: Response) {
    try {
        const json = await req.json();
        const body = registerSchema.parse(json);

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ email: body.email }, { username: body.username }],
            },
        });

        if (userExists) {
            return ErrorResponse.badRequest(req, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                hashedPassword,
            },
        });

        const response: ApiResponse<UserResponse> = {
            status: "success",
            data: populateUserResponse(user),
        };

        return NextResponse.json(response, { status: HttpStatusCode.Created });
    } catch (err) {
        return ErrorResponse.serverErrorWithZod(req, err);
    }
}
