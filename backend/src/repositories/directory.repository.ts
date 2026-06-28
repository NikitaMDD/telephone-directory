import { prisma } from "../lib/prisma.js";

export class DirectoryRepository {
    async getDirectory() {
        return prisma.department.findMany({
            where: {
                isActive: true,
            },

            include: {
                location: true,

                employees: {
                    where: {
                        isActive: true,
                    },

                    orderBy: [
                        {
                            sortOrder: "asc",
                        },
                        {
                            lastName: "asc",
                        },
                    ],
                },
            },

            orderBy: [
                {
                    sortOrder: "asc",
                },
                {
                    name: "asc",
                },
            ],
        });
    }
}

export const directoryRepository =
    new DirectoryRepository();