import { prisma } from "../lib/prisma.js";

export class SearchRepository {
    async search(query: string) {
        return prisma.employee.findMany({
            where: {
                isActive: true,

                OR: [
                    {
                        lastName: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        firstName: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        middleName: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        position: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        internalPhone: {
                            contains: query,
                        },
                    },
                    {
                        cityPhone: {
                            contains: query,
                        },
                    },
                    {
                        email: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        room: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        department: {
                            is: {
                                name: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                    {
                        department: {
                            is: {
                                abbreviation: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                    {
                        department: {
                            is: {
                                location: {
                                    is: {
                                        name: {
                                            contains: query,
                                            mode: "insensitive",
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
            },

            include: {
                department: {
                    include: {
                        location: true,
                    },
                },
            },

            orderBy: [
                {
                    sortOrder: "asc",
                },
                {
                    lastName: "asc",
                },
            ],
        });
    }
}

export const searchRepository = new SearchRepository();