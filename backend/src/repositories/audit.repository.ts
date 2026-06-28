import { prisma } from "../lib/prisma.js";

export class AuditRepository {
    create(data: {
        action: string;
        entity: string;
        entityId: string;
        oldValue?: unknown;
        newValue?: unknown;
        userId?: string;
    }) {
        return prisma.auditLog.create({
            data,
        });
    }

    findAll() {
        return prisma.auditLog.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        login: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}

export const auditRepository = new AuditRepository();