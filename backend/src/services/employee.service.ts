import { prisma } from "../lib/prisma.js";

import { HttpError } from "../utils/http-error.js";

import { employeeRepository } from "../repositories/employee.repository.js";

import type {
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from "../dto/employee.dto.js";

export class EmployeeService {
    async getAll() {
        return employeeRepository.findAll();
    }

    async getById(id: string) {
        const employee =
            await employeeRepository.findById(id);

        if (!employee) {
            throw new HttpError(
                404,
                "Employee not found"
            );
        }

        return employee;
    }

    async create(data: CreateEmployeeDto) {
        const department =
            await prisma.department.findUnique({
                where: {
                    id: data.departmentId,
                },
            });

        if (!department) {
            throw new HttpError(
                404,
                "Department not found"
            );
        }

        return employeeRepository.create(data);
    }

    async update(
        id: string,
        data: UpdateEmployeeDto
    ) {
        await this.getById(id);

        if (data.departmentId) {
            const department =
                await prisma.department.findUnique({
                    where: {
                        id: data.departmentId,
                    },
                });

            if (!department) {
                throw new HttpError(
                    404,
                    "Department not found"
                );
            }
        }

        return employeeRepository.update(
            id,
            data
        );
    }

    async remove(id: string) {
        await this.getById(id);

        return employeeRepository.delete(id);
    }
}

export const employeeService =
    new EmployeeService();