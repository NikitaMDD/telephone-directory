import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { searchService } from "../services/search.service.js";

export class SearchController {
    search = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = req.query.q as string | undefined;

            const data =
                await searchService.search(query);

            res.json(data);
        } catch (error) {
            next(error);
        }
    };
}

export const searchController =
    new SearchController();