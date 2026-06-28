import { api } from "@/shared/api";

import type { Department } from "../types";

export const departmentsApi = {
    getAll() {
        return api<Department[]>(
            "/departments"
        );
    },
};