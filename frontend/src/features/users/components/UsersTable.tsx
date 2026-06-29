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

                <table className="w-full">

                    <thead className="bg-surface">

                        <tr>

                            <th className="px-6 py-4 text-left font-semibold">
                                Имя
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Логин
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Роль
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Статус
                            </th>

                            <th className="w-24" />

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map(
                            (user) => (
                                <tr
                                    key={user.id}
                                    className="border-t transition-colors hover:bg-surface"
                                >
                                    <td className="px-6 py-4">
                                        <Typography weight="medium">
                                            {user.name}
                                        </Typography>
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.login}
                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            ROLE_LABELS[
                                                user.role
                                            ]
                                        }
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.isActive
                                            ? "Активен"
                                            : "Заблокирован"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <UserActions
                                            onEdit={() =>
                                                onEdit(
                                                    user
                                                )
                                            }
                                            onDelete={() => {
                                                if (
                                                    window.confirm(
                                                        `Удалить пользователя "${user.name}"?`
                                                    )
                                                ) {
                                                    deleteMutation.mutate(
                                                        user.id
                                                    );
                                                }
                                            }}
                                        />
                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>
        </Card>
    );
}