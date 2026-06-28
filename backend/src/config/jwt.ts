import jwt from "jsonwebtoken";
import { env } from "./env.js";
import type { Role } from "@prisma/client";

export interface JwtPayload {
    id: string;
    role: Role;
}

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn,
    });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
}