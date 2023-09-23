import { ApiResponse } from "@/types/api-response";
import { NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import { StatusCode } from "./status-code";

export class ErrorResponse {
    private static readonly authenticationRequiredResponseMessage =
        "You must be authenticated to access this resource";
    private static readonly notFoundResponseMessage =
        "The requested resource could not be found";
    //private static readonly invalidCredentialsResponseMessage =
    //"Invalid authentication credentials";
    private static readonly serverErrorResponseMessage =
        "The server encountered a problem and could not process your request";

    private constructor() { }

    public static error<T>(
        req: Request,
        err: any,
        status: StatusCode,
        message: T
    ) {
        if (process.env.NODE_ENV === "development") {
            console.log({
                url: req.url,
                method: req.method,
                error: err,
            });
        }
        const apiResponse: ApiResponse<T> = {
            status: "error",
            message,
        };
        return NextResponse.json(apiResponse, { status: status });
    }

    public static badRequest(req: Request, message: string) {
        return ErrorResponse.error(req, null, StatusCode.BAD_REQUEST, message);
    }

    public static notFound(req: Request) {
        return ErrorResponse.error(
            req,
            null,
            StatusCode.NOT_FOUND,
            ErrorResponse.notFoundResponseMessage
        );
    }

    public static authenticationError(req: Request) {
        return ErrorResponse.error(
            req,
            null,
            StatusCode.UNAUTHORIZED,
            ErrorResponse.authenticationRequiredResponseMessage
        );
    }

    public static failedValidation(req: Request, err: any, issues: ZodIssue[]) {
        return ErrorResponse.error(
            req,
            err,
            StatusCode.UNPROCESSABLE_ENTITY,
            issues
        );
    }

    public static serverError(req: Request, err: any) {
        return ErrorResponse.error(
            req,
            err,
            StatusCode.INTERNAL_SERVER_ERROR,
            ErrorResponse.serverErrorResponseMessage
        );
    }

    public static serverErrorWithZod(req: Request, err: any) {
        if (err instanceof z.ZodError) {
            return ErrorResponse.failedValidation(req, err, err.issues);
        }
        return ErrorResponse.serverError(req, err);
    }
}
