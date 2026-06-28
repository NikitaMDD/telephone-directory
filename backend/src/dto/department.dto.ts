import { DepartmentType } from "@prisma/client";

export interface CreateDepartmentDto {
    name: string;
    abbreviation?: string;
    type: DepartmentType;

    locationId: string;

    parentId?: string;

    sortOrder?: number;
    isActive?: boolean;
}

export interface UpdateDepartmentDto {
    name?: string;
    abbreviation?: string;
    type?: DepartmentType;

    locationId?: string;

    parentId?: string | null;

    sortOrder?: number;
    isActive?: boolean;
}