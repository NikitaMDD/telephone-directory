export interface CreateLocationDto {
    name: string;
    address?: string | null;
    sortOrder?: number;
    isActive?: boolean;
}

export interface UpdateLocationDto {
    name?: string;
    address?: string | null;
    sortOrder?: number;
    isActive?: boolean;
}