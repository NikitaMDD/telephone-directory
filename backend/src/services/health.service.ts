import { prisma } from "../lib/prisma.js";

class HealthService {
    async checkDatabase() {
        await prisma.$queryRaw`SELECT 1`;

        return {
            status: "ok",
            database: "connected",
        };
    }
}

export const healthService = new HealthService();