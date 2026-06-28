import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { auditService } from "../services/audit.service.js";

export class AuditController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const logs = await auditService.getAll();

            res.json(logs);
        } catch (error) {
            next(error);
        }
    };
}

export const auditController =
    new AuditController();