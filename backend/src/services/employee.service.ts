import { prisma } from "../lib/prisma.js";

import { HttpError } from "../utils/http-error.js";

import { employeeRepository } from "../repositories/employee.repository.js";

import type {
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from "../dto/employee.dto.js";

import { auditService } from "./audit.service.js";

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

        const employee =
            await employeeRepository.create(data);

        await auditService.create({
            action: "CREATE",
            entity: "EMPLOYEE",
            entityId: employee.id,
            newValue: employee,
        });

        return employee;
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

        const oldEmployee =
            await this.getById(id);

        const updated =
            await employeeRepository.update(id, data);

        await auditService.create({
            action: "UPDATE",
            entity: "EMPLOYEE",
            entityId: id,
            oldValue: oldEmployee,
            newValue: updated,
        });

        return updated;
    }

    async remove(id: string) {
        await this.getById(id);

        const oldEmployee =
            await this.getById(id);

        await employeeRepository.delete(id);

        await auditService.create({
            action: "DELETE",
            entity: "EMPLOYEE",
            entityId: id,
            oldValue: oldEmployee,
        });
    }
}

export const employeeService =
    new EmployeeService();