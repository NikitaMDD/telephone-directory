import { HttpError } from "../utils/http-error.js";

import {
    locationRepository,
} from "../repositories/location.repository.js";

import type {
    CreateLocationDto,
    UpdateLocationDto,
} from "../dto/location.dto.js";

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
        return locationRepository.create(data);
    }

    async update(
        id: string,
        data: UpdateLocationDto
    ) {
        await this.getById(id);

        return locationRepository.update(id, data);
    }

    async remove(id: string) {
        await this.getById(id);

        return locationRepository.delete(id);
    }
}

export const locationService =
    new LocationService();