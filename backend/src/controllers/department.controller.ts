import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { departmentService } from "../services/department.service.js";

import type {
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from "../dto/department.dto.js";

import type { IdParams } from "../types/request.js";

export class DepartmentController {

    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.json(
                await departmentService.getAll()
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
                await departmentService.getById(
                    req.params.id
                )
            );
        } catch (error) {
            next(error);
        }
    };

    create = async (
        req: Request<
            Record<string, never>,
            unknown,
            CreateDepartmentDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.status(201).json(
                await departmentService.create(
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
            unknown,
            UpdateDepartmentDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.json(
                await departmentService.update(
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
            await departmentService.remove(
                req.params.id
            );

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
}

export const departmentController =
    new DepartmentController();