import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { locationService } from "../services/location.service.js";

import type {
    CreateLocationDto,
    UpdateLocationDto,
} from "../dto/location.dto.js";

import type { IdParams } from "../types/request.js";

export class LocationController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await locationService.getAll();

            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    getById = async (
        req: Request<IdParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await locationService.getById(req.params.id);

            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    create = async (
        req: Request<Record<string, never>, unknown, CreateLocationDto>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await locationService.create(req.body);

            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request<IdParams, unknown, UpdateLocationDto>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await locationService.update(
                req.params.id,
                req.body
            );

            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    remove = async (
        req: Request<IdParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await locationService.remove(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
}

export const locationController = new LocationController();