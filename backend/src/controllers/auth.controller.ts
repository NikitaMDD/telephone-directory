import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { authService } from "../services/auth.service.js";

import { env } from "../config/env.js";

export class AuthController {

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result = await authService.login(req.body);

            res.cookie(
                env.cookieName,
                result.token,
                {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: env.nodeEnv === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                }
            );

            res.json({
                user: result.user,
            });

        } catch (error) {
            next(error);
        }

    }

    logout(
        _req: Request,
        res: Response
    ) {

        res.clearCookie(env.cookieName);

        res.json({
            message: "Logged out",
        });

    }

    async me(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const user = await authService.me(
                req.user!.id
            );

            res.json(user);

        } catch (error) {
            next(error);
        }

    }

}

export const authController =
    new AuthController();