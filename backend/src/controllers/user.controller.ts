import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { userService } from "../services/user.service.js";

import type {
    CreateUserDto,
    UpdateUserDto,
} from "../dto/user.dto.js";

import type { IdParams } from "../types/request.js";

export class UserController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.json(
                await userService.getAll()
            );
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
            res.json(
                await userService.getById(
                    req.params.id
                )
            );
        } catch (error) {
            next(error);
        }
    };

    create = async (
        req: Request<
            {},
            {},
            CreateUserDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.status(201).json(
                await userService.create(
                    req.body
                )
            );
        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request<
            IdParams,
            {},
            UpdateUserDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.json(
                await userService.update(
                    req.params.id,
                    req.body
                )
            );
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
            await userService.remove(
                req.params.id
            );

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
}

export const userController =
    new UserController();