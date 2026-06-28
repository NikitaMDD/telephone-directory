import { hashPassword } from "../utils/password.js";

import { HttpError } from "../utils/http-error.js";

import { userRepository } from "../repositories/user.repository.js";
import { auditService } from "./audit.service.js";

import type {
    CreateUserDto,
    UpdateUserDto,
} from "../dto/user.dto.js";

export class UserService {
    getAll() {
        return userRepository.findAll();
    }

    async getById(id: string) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new HttpError(
                404,
                "User not found"
            );
        }

        return user;
    }

    async create(data: CreateUserDto) {
        const exists =
            await userRepository.findByLogin(
                data.login
            );

        if (exists) {
            throw new HttpError(
                409,
                "Login already exists"
            );
        }

        const passwordHash =
            await hashPassword(data.password);

        const user =
            await userRepository.create({
                ...data,
                passwordHash,
            });

        await auditService.create({
            action: "CREATE",
            entity: "USER",
            entityId: user.id,
            newValue: user,
        });

        return user;
    }

    async update(
        id: string,
        data: UpdateUserDto
    ) {
        await this.getById(id);

        const payload: any = {
            ...data,
        };

        if (data.password) {
            payload.passwordHash =
                await hashPassword(
                    data.password
                );

            delete payload.password;
        }

        const oldUser =
            await this.getById(id);

        const updated =
            await userRepository.update(
                id,
                payload
            );

        await auditService.create({
            action: "UPDATE",
            entity: "USER",
            entityId: id,
            oldValue: oldUser,
            newValue: updated,
        });

        return updated;
    }

    async remove(id: string) {
        await this.getById(id);

        const oldUser =
            await this.getById(id);

        await userRepository.delete(id);

        await auditService.create({
            action: "DELETE",
            entity: "USER",
            entityId: id,
            oldValue: oldUser,
        });
    }
}

export const userService =
    new UserService();