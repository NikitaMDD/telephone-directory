import { comparePassword } from "../utils/password.js";
import { signToken } from "../config/jwt.js";

import { authRepository } from "../repositories/auth.repository.js";

import type { LoginDto } from "../dto/auth.dto.js";

import { HttpError } from "../utils/http-error.js";

export class AuthService {

    async login(data: LoginDto) {

        const user = await authRepository.findByLogin(data.login);

        if (!user) {
            throw new HttpError(
                401,
                "Invalid login or password"
            );
        }

        const isValid = await comparePassword(
            data.password,
            user.passwordHash
        );

        if (!isValid) {
            throw new HttpError(
                401,
                "Invalid login or password"
            );
        }

        const token = signToken({
            id: user.id,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            },
        };
    }

    async me(id: string) {

        const user = await authRepository.findById(id);

        if (!user) {
            throw new HttpError(
                404,
                "User not found"
            );
        }

        return {
            id: user.id,
            name: user.name,
            role: user.role,

        };
    }
}

export const authService = new AuthService();