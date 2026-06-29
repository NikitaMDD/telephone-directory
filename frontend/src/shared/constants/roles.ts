import type { Role } from "@/features/users/types";

export const ROLE_OPTIONS: {
    value: Role;
    label: string;
}[] = [
    {
        value: "ADMIN",
        label: "Администратор",
    },
    {
        value: "EDITOR",
        label: "Редактор",
    },
    {
        value: "USER",
        label: "Пользователь",
    },
];

export const ROLE_LABELS: Record<
    Role,
    string
> = {
    ADMIN: "Администратор",

    EDITOR: "Редактор",

    USER: "Пользователь",
};