import { api } from "@/shared/api";

import type {
    Location,
    CreateLocationDto,
    UpdateLocationDto,
} from "../types";

export const locationsApi = {
    getAll() {
        return api<Location[]>(
            "/locations"
        );
    },

    getById(id: string) {
        return api<Location>(
            `/locations/${id}`
        );
    },

    create(dto: CreateLocationDto) {
        return api<Location>(
            "/locations",
            {
                method: "POST",
                body: dto,
            }
        );
    },

    update(
        id: string,
        dto: UpdateLocationDto
    ) {
        return api<Location>(
            `/locations/${id}`,
            {
                method: "PUT",
                body: dto,
            }
        );
    },

    remove(id: string) {
        return api<void>(
            `/locations/${id}`,
            {
                method: "DELETE",
            }
        );
    },
};