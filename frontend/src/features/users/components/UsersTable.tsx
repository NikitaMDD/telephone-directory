import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";

import {
    useDeleteUser,
    useUsers,
} from "../hooks/useUsers";

import { UserActions } from "./UserActions";

import {
    ROLE_LABELS,
} from "@/shared/constants/roles";

import type { User } from "../types";
import { cn } from "@/shared/lib/cn";

interface Props {
    search: string;
    onEdit(user: User): void;
}

export function UsersTable({
    search,
    onEdit,
}: Props) {
    const {
        data: users = [],
        isPending,
        isError,
    } = useUsers();

    const deleteMutation =
        useDeleteUser();

    const filteredUsers =
        useMemo(() => {
            const value =
                search.toLowerCase();

            return users.filter(
                (user) =>
                    `
${user.name}
${user.login}
${ROLE_LABELS[user.role]}
`
                        .toLowerCase()
                        .includes(value)
            );
        }, [users, search]);

    if (isPending) {
        return (
            <Card className="flex min-h-96 items-center justify-center">
                <Loader size="lg" />
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="flex min-h-96 items-center justify-center">
                <Typography color="danger">
                    Не удалось загрузить пользователей
                </Typography>
            </Card>
        );
    }

    if (!filteredUsers.length) {
        return (
            <Card>
                <EmptyState
                    title="Пользователи не найдены"
                    description="Добавьте первого пользователя."
                />
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="glass-table">

                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Логин</th>
                            <th>Роль</th>
                            <th>Статус</th>
                            <th className="w-24" />
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Typography weight="medium">
                                        {user.name}
                                    </Typography>
                                </td>

                                <td>{user.login}</td>

                                <td>{ROLE_LABELS[user.role]}</td>

                                <td>
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                                            user.isActive
                                                ? "bg-[#2E8B57]/15 text-[#2E8B57] ring-1 ring-[#2E8B57]/20"
                                                : "bg-neutral-500/15 text-neutral-600 ring-1 ring-neutral-500/20"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                user.isActive
                                                    ? "bg-[#2E8B57]"
                                                    : "bg-neutral-500"
                                            )}
                                        />
                                        {user.isActive ? "Активен" : "Заблокирован"}
                                    </span>
                                </td>

                                <td>
                                    <UserActions
                                        onEdit={() => onEdit(user)}
                                        // onDelete={() => {
                                        //     if (
                                        //         window.confirm(
                                        //             `Удалить пользователя "${user.name}"?`
                                        //         )
                                        //     ) {
                                        //         deleteMutation.mutate(
                                        //             user.id
                                        //         );
                                        //     }
                                        // }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </Card>
    );
}