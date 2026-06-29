import { z } from "zod";

export const roles = [
    "ADMIN",
    "EDITOR",
    "USER",
] as const;

export const userSchema = z.object({
    name: z
        .string()
        .min(1, "Введите имя"),

    login: z
        .string()
        .min(1, "Введите логин"),

    password: z
        .string()
        .optional(),

    role: z.enum(roles, {
        error: "Выберите роль",
    }),
});

export type UserFormValues =
    z.infer<
        typeof userSchema
    >;