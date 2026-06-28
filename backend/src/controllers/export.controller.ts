import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { exportService } from "../services/export.service.js";

export class ExportController {
    pdf = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const pdf =
                await exportService.generatePdf();

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="telephone-directory.pdf"'
            );

            pdf.pipe(res);
        } catch (error) {
            next(error);
        }
    };
}

export const exportController =
    new ExportController();