import { api } from "@/shared/api";

import type {
    Employee,
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from "../types";

export const employeesApi = {
    getAll() {
        return api<Employee[]>("/employees");
    },

    getById(id: string) {
        return api<Employee>(
            `/employees/${id}`
        );
    },

    create(dto: CreateEmployeeDto) {
        return api<Employee>(
            "/employees",
            {
                method: "POST",
                body: dto,
            }
        );
    },

    update(
        id: string,
        dto: UpdateEmployeeDto
    ) {
        return api<Employee>(
            `/employees/${id}`,
            {
                method: "PUT",
                body: dto,
            }
        );
    },

    remove(id: string) {
        return api<void>(
            `/employees/${id}`,
            {
                method: "DELETE",
            }
        );
    },
};