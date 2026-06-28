import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { employeeService } from "../services/employee.service.js";

import type {
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from "../dto/employee.dto.js";

import type { IdParams } from "../types/request.js";

export class EmployeeController {
    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await employeeService.getAll();

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
            const data = await employeeService.getById(
                req.params.id
            );

            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    create = async (
        req: Request<
            Record<string, never>,
            unknown,
            CreateEmployeeDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await employeeService.create(
                req.body
            );

            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request<
            IdParams,
            unknown,
            UpdateEmployeeDto
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await employeeService.update(
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
            await employeeService.remove(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
}

export const employeeController =
    new EmployeeController();