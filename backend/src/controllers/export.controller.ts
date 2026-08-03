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
            const buffer =
                await exportService.generatePdf();

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="telephone-directory.pdf"'
            );

            res.send(buffer);
        } catch (error) {
            next(error);
        }
    };

    docx = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const buffer =
                await exportService.generateDocx();

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="telephone-directory.docx"'
            );

            res.send(buffer);
        } catch (error) {
            next(error);
        }
    };
}

export const exportController =
    new ExportController();