import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { HttpError } from "../utils/http-error.js";

export function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error(error);

    if (error instanceof HttpError) {
        return res.status(error.status).json({
            message: error.message,
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
}