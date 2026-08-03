import { prisma } from "../lib/prisma.js";

import { HttpError } from "../utils/http-error.js";

import {
    departmentRepository,
} from "../repositories/department.repository.js";

import type {
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from "../dto/department.dto.js";

import { auditService } from "./audit.service.js";

export class DepartmentService {

    async getAll() {
        return departmentRepository.findAll();
    }

    async getById(id: string) {
        const department =
            await departmentRepository.findById(id);

        if (!department) {
            throw new HttpError(
                404,
                "Department not found"
            );
        }

        return department;
    }

    async create(data: CreateDepartmentDto) {
        const payload: CreateDepartmentDto = {
            ...data,
            parentId: data.parentId || undefined,
        };

        const location =
            await prisma.location.findUnique({
                where: {
                    id: payload.locationId,
                },
            });

        if (!location) {
            throw new HttpError(
                404,
                "Location not found"
            );
        }

        if (payload.parentId) {
            const parent =
                await departmentRepository.findById(
                    payload.parentId
                );

            if (!parent) {
                throw new HttpError(
                    404,
                    "Parent department not found"
                );
            }
        }

        const department =
            await departmentRepository.create(payload);

        await auditService.create({
            action: "CREATE",
            entity: "DEPARTMENT",
            entityId: department.id,
            newValue: department,
        });

        return department;
    }

    async update(
        id: string,
        data: UpdateDepartmentDto
    ) {
        const payload: UpdateDepartmentDto = {
            ...data,
            parentId: data.parentId || null,
        };

        const oldDepartment = await this.getById(id);

        if (payload.locationId) {
            const location = await prisma.location.findUnique({
                where: { id: payload.locationId },
            });

            if (!location) {
                throw new HttpError(404, "Location not found");
            }
        }

        if (payload.parentId) {
            const parent = await departmentRepository.findById(payload.parentId);

            if (!parent) {
                throw new HttpError(404, "Parent department not found");
            }
        }

        const updated = await departmentRepository.update(id, payload);

        await auditService.create({
            action: "UPDATE",
            entity: "DEPARTMENT",
            entityId: id,
            oldValue: oldDepartment,
            newValue: updated,
        });

        return updated;
    }

    async remove(id: string) {
        const oldDepartment =
            await this.getById(id);

        await departmentRepository.delete(id);

        await auditService.create({
            action: "DELETE",
            entity: "DEPARTMENT",
            entityId: id,
            oldValue: oldDepartment,
        });
    }
}

export const departmentService =
    new DepartmentService();