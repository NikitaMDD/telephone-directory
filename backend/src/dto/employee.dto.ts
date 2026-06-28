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

export interface UpdateEmployeeDto {
    lastName?: string;
    firstName?: string;
    middleName?: string;

    position?: string;

    internalPhone?: string;
    cityPhone?: string;

    email?: string;

    room?: string;

    departmentId?: string;

    sortOrder?: number;
    isActive?: boolean;
}