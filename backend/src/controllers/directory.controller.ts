import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { directoryService } from "../services/directory.service.js";

export class DirectoryController {
    getDirectory = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data =
                await directoryService.getDirectory();

            res.json(data);
        } catch (error) {
            next(error);
        }
    };
}

export const directoryController =
    new DirectoryController();