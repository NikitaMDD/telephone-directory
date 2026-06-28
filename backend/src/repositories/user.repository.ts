import { prisma } from "../lib/prisma.js";

import type {
    CreateUserDto,
    UpdateUserDto,
} from "../dto/user.dto.js";

import { Role } from "@prisma/client";

export class UserRepository {
    findAll() {
        return prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    findById(id: string) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    findByLogin(login: string) {
        return prisma.user.findUnique({
            where: {
                login,
            },
        });
    }

    create(
        data: Omit<CreateUserDto, "password"> & {
            passwordHash: string;
        }
    ) {
        return prisma.user.create({
            data: {
                name: data.name,
                login: data.login,
                role: data.role,
                passwordHash: data.passwordHash,
            },
        });
    }

    update(
        id: string,
        data: Partial<{
            name: string;
            login: string;
            role: Role;
            isActive: boolean;
            passwordHash: string;
        }>
    ) {
        return prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }

    delete(id: string) {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    }
}

export const userRepository =
    new UserRepository();