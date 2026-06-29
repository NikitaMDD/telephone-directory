export interface Location {
    id: string;

    name: string;

    address?: string;

    sortOrder: number;

    isActive: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface CreateLocationDto {
    name: string;

    address?: string;

    sortOrder?: number;

    isActive?: boolean;
}

export interface UpdateLocationDto
    extends Partial<CreateLocationDto> {}