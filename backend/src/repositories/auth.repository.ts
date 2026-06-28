import { prisma } from "../lib/prisma.js";

export class AuthRepository {
    async findByLogin(login: string) {
        return prisma.user.findUnique({
            where: {
                login,
            },
        });
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}

export const authRepository = new AuthRepository();