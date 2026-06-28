export interface LoginDto {
    login: string;
    password: string;
}

export interface AuthUserDto {
    id: string;
    name: string;
    role: "ADMIN" | "EDITOR";
}

export interface LoginResponseDto {
    token: string;
    user: AuthUserDto;
}