import { prisma } from "../lib/prisma.js";

import { HttpError } from "../utils/http-error.js";

import {
    departmentRepository,
} from "../repositories/department.repository.js";

import type {
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from "../dto/department.dto.js";

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

        const location =
            await prisma.location.findUnique({
                where: {
                    id: data.locationId,
                },
            });

        if (!location) {
            throw new HttpError(
                404,
                "Location not found"
            );
        }

        if (data.parentId) {

            const parent =
                await departmentRepository.findById(
                    data.parentId
                );

            if (!parent) {
                throw new HttpError(
                    404,
                    "Parent department not found"
                );
            }
        }

        return departmentRepository.create(data);
    }

    async update(
        id: string,
        data: UpdateDepartmentDto
    ) {

        await this.getById(id);

        if (data.locationId) {

            const location =
                await prisma.location.findUnique({
                    where: {
                        id: data.locationId,
                    },
                });

            if (!location) {
                throw new HttpError(
                    404,
                    "Location not found"
                );
            }
        }

        if (data.parentId) {

            const parent =
                await departmentRepository.findById(
                    data.parentId
                );

            if (!parent) {
                throw new HttpError(
                    404,
                    "Parent department not found"
                );
            }
        }

        return departmentRepository.update(
            id,
            data
        );
    }

    async remove(id: string) {

        await this.getById(id);

        return departmentRepository.delete(id);
    }
}

export const departmentService =
    new DepartmentService();