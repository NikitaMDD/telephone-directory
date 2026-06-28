export interface LoginDto {
    login: string;
    password: string;
}

export interface AuthUser {
    id: string;
    name: string;
    login: string;
    role: "ADMIN" | "EDITOR";
}

export interface LoginResponse {
    user: AuthUser;
}