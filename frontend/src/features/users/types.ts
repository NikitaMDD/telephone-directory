export type Role =
    | "ADMIN"
    | "EDITOR"
    | "USER";

export interface User {
    id: string;

    name: string;

    login: string;

    role: Role;

    isActive: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface CreateUserDto {
    name: string;

    login: string;

    password: string;

    role: Role;
}

export interface UpdateUserDto {
    name?: string;

    login?: string;

    password?: string;

    role?: Role;

    isActive?: boolean;
}