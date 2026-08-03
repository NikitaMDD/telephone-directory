import { api } from "@/shared/api";

import type {
    Department,
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from "../types";

export const departmentsApi = {
    getAll() {
        return api<Department[]>("/departments");
    },

    getById(id: string) {
        return api<Department>(
            `/departments/${id}`
        );
    },

    create(dto: CreateDepartmentDto) {
        return api<Department>(
            "/departments",
            {
                method: "POST",
                body: dto,
            }
        );
    },

    update(
        id: string,
        dto: UpdateDepartmentDto
    ) {
        return api<Department>(
            `/departments/${id}`,
            {
                method: "PATCH",
                body: dto,
            }
        );
    },

    remove(id: string) {
        return api<void>(
            `/departments/${id}`,
            {
                method: "DELETE",
            }
        );
    },
};