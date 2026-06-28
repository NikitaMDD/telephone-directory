export interface CreateLocationDto {
    name: string;
    sortOrder?: number;
    isActive?: boolean;
}

export interface UpdateLocationDto {
    name?: string;
    sortOrder?: number;
    isActive?: boolean;
}