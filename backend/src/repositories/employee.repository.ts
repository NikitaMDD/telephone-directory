import { prisma } from "../lib/prisma.js";

import type {
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from "../dto/employee.dto.js";

export class EmployeeRepository {
    async findAll() {
        return prisma.employee.findMany({
            include: {
                department: {
                    include: {
                        location: true,
                    },
                },
            },
            orderBy: [
                {
                    sortOrder: "asc",
                },
                {
                    lastName: "asc",
                },
            ],
        });
    }

    async findById(id: string) {
        return prisma.employee.findUnique({
            where: {
                id,
            },
            include: {
                department: {
                    include: {
                        location: true,
                    },
                },
            },
        });
    }

    async create(data: CreateEmployeeDto) {
        return prisma.employee.create({
            data: {
                ...data,
                sortOrder: data.sortOrder ?? 0,
                isActive: data.isActive ?? true,
            },
            include: {
                department: {
                    include: {
                        location: true,
                    },
                },
            },
        });
    }

    async update(
        id: string,
        data: UpdateEmployeeDto
    ) {
        return prisma.employee.update({
            where: {
                id,
            },
            data,
            include: {
                department: {
                    include: {
                        location: true,
                    },
                },
            },
        });
    }

    async delete(id: string) {
        return prisma.employee.delete({
            where: {
                id,
            },
        });
    }
}

export const employeeRepository =
    new EmployeeRepository();