export interface Department {
    id: string;

    name: string;

    abbreviation?: string;

    type: DepartmentType;

    locationId: string;

    parentId?: string | null;

    sortOrder: number;

    isActive: boolean;

    location: {
        id: string;
        name: string;
    };

    parent?: {
        id: string;
        name: string;
    } | null;

    createdAt: string;

    updatedAt: string;
}

export interface CreateDepartmentDto {
    name: string;

    abbreviation?: string;

    type: DepartmentType;

    locationId: string;

    parentId?: string;

    sortOrder?: number;

    isActive?: boolean;
}

export interface UpdateDepartmentDto
    extends Partial<CreateDepartmentDto> {}

export type DepartmentType =
    | "FACULTY"
    | "DEPARTMENT"
    | "ADMINISTRATION"
    | "OTHER";