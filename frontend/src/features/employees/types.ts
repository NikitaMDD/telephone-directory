export interface Employee {
    id: string;
    lastName: string;
    firstName: string;
    middleName?: string;
    position: string;
    internalPhone?: string;
    cityPhone?: string;
    email?: string;
    room?: string;
    sortOrder: number;
    isActive: boolean;
    departmentId: string;
    department: {
        id: string;
        name: string;
        location: {
            id: string;
            name: string;
        };
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateEmployeeDto {
    lastName: string;
    firstName: string;
    middleName?: string;
    position: string;
    internalPhone?: string;
    cityPhone?: string;
    email?: string;
    room?: string;
    departmentId: string;
    sortOrder?: number;
    isActive?: boolean;
}

export interface UpdateEmployeeDto
    extends Partial<CreateEmployeeDto> {}