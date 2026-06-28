import type { Request, Response, NextFunction } from "express";
import { healthService } from "../services/health.service.js";

class HealthController {
    health(_req: Request, res: Response) {
        res.json({
            status: "ok",
            service: "telephone-directory-api",
        });
    }

    async database(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await healthService.checkDatabase();

            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export const healthController = new HealthController();