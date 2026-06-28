import { prisma } from "../lib/prisma.js";
import type {
    CreateLocationDto,
    UpdateLocationDto,
} from "../dto/location.dto.js";

export class LocationRepository {
    async findAll() {
        return prisma.location.findMany({
            orderBy: {
                sortOrder: "asc",
            },
        });
    }

    async findById(id: string) {
        return prisma.location.findUnique({
            where: { id },
        });
    }

    async create(data: CreateLocationDto) {
        return prisma.location.create({
            data: {
                name: data.name,
                sortOrder: data.sortOrder ?? 0,
                isActive: data.isActive ?? true,
            },
        });
    }

    async update(
        id: string,
        data: UpdateLocationDto
    ) {
        return prisma.location.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.location.delete({
            where: { id },
        });
    }
}

export const locationRepository =
    new LocationRepository();