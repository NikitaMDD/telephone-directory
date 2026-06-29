import { api } from "@/shared/api";

import type {
    User,
    CreateUserDto,
    UpdateUserDto,
} from "../types";

export const usersApi = {
    getAll() {
        return api<User[]>("/users");
    },

    getById(id: string) {
        return api<User>(
            `/users/${id}`
        );
    },

    create(dto: CreateUserDto) {
        return api<User>(
            "/users",
            {
                method: "POST",
                body: dto,
            }
        );
    },

    update(
        id: string,
        dto: UpdateUserDto
    ) {
        return api<User>(
            `/users/${id}`,
            {
                method: "PUT",
                body: dto,
            }
        );
    },

    remove(id: string) {
        return api<void>(
            `/users/${id}`,
            {
                method: "DELETE",
            }
        );
    },
};