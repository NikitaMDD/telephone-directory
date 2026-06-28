import { Role } from "@prisma/client";

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