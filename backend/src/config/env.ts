import "dotenv/config";
import { SignOptions } from "jsonwebtoken";

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable "${name}" is not defined.`);
    }

    return value;
}

export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.BACKEND_PORT ?? 3000),
    databaseUrl: required("DATABASE_URL"),
    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN ??
        "7d") as SignOptions["expiresIn"],
    cookieName: process.env.COOKIE_NAME ?? "telephone_token",
};