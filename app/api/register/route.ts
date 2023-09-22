import { registerSchema } from "@/validators/register";
import { ErrorResponse } from "@/lib/error-response";

export async function GET(req: Request, res: Response) {
    return ErrorResponse.notFound(req, null);
}

export async function POST(req: Request, res: Response) {
    try {
        const json = await req.json();
        const body = registerSchema.parse(json);
    } catch (err) {
        return ErrorResponse.serverErrorWithZod(req, err);
    }
}
