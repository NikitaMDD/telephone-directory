import { HttpError } from "../utils/http-error.js";

import {
    locationRepository,
} from "../repositories/location.repository.js";

import type {
    CreateLocationDto,
    UpdateLocationDto,
} from "../dto/location.dto.js";

import { auditService } from "./audit.service.js";

export class LocationService {
    async getAll() {
        return locationRepository.findAll();
    }

    async getById(id: string) {
        const location =
            await locationRepository.findById(id);

        if (!location) {
            throw new HttpError(
                404,
                "Location not found"
            );
        }

        return location;
    }

    async create(data: CreateLocationDto) {
        const location =
            await locationRepository.create(data);

        await auditService.create({
            action: "CREATE",
            entity: "LOCATION",
            entityId: location.id,
            newValue: location,
        });

        return location;
    }

    async update(
        id: string,
        data: UpdateLocationDto
    ) {
        await this.getById(id);

        const oldLocation =
            await this.getById(id);

        const updated =
            await locationRepository.update(id, data);

        await auditService.create({
            action: "UPDATE",
            entity: "LOCATION",
            entityId: id,
            oldValue: oldLocation,
            newValue: updated,
        });

        return updated;
    }

    async remove(id: string) {
        await this.getById(id);

        const oldLocation =
            await this.getById(id);

        await locationRepository.delete(id);

        await auditService.create({
            action: "DELETE",
            entity: "LOCATION",
            entityId: id,
            oldValue: oldLocation,
        });
    }
}

export const locationService =
    new LocationService();