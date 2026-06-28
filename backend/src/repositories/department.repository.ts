import { prisma } from "../lib/prisma.js";

import type {
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from "../dto/department.dto.js";

export class DepartmentRepository {
    async findAll() {
        return prisma.department.findMany({
            include: {
                location: true,
                parent: true,
            },
            orderBy: {
                sortOrder: "asc",
            },
        });
    }

    async findById(id: string) {
        return prisma.department.findUnique({
            where: { id },
            include: {
                location: true,
                parent: true,
            },
        });
    }

    async create(data: CreateDepartmentDto) {
        return prisma.department.create({
            data: {
                ...data,
                sortOrder: data.sortOrder ?? 0,
                isActive: data.isActive ?? true,
            },
            include: {
                location: true,
                parent: true,
            },
        });
    }

    async update(
        id: string,
        data: UpdateDepartmentDto
    ) {
        return prisma.department.update({
            where: { id },
            data,
            include: {
                location: true,
                parent: true,
            },
        });
    }

    async delete(id: string) {
        return prisma.department.delete({
            where: { id },
        });
    }
}

export const departmentRepository =
    new DepartmentRepository();