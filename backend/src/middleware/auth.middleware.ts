import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { verifyToken } from "../config/jwt.js";
import { env } from "../config/env.js";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies[env.cookieName];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        req.user = verifyToken(token);

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}