import { api } from "./api";

import type {
    LoginDto,
    LoginResponse,
} from "@/features/auth/types";

export const authApi = {
    login(dto: LoginDto) {
        return api<
            LoginResponse,
            LoginDto
        >("/auth/login", {
            method: "POST",
            body: dto,
        });
    },

    logout() {
        return api<void>("/auth/logout", {
            method: "POST",
        });
    },

    me() {
        return api<LoginResponse>(
            "/auth/me"
        );
    },
};