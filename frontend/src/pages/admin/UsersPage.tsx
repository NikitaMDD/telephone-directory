import { useState } from "react";

import { Plus, Search, X } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { UsersTable } from "@/features/users/components/UsersTable";
import { UserDialog } from "@/features/users/components/UserDialog";

import type { User } from "@/features/users/types";

import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

export function UsersPage() {
    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState<User>();

    function handleCreate() {
        setSelectedUser(undefined);

        setOpen(true);
    }

    function handleEdit(
        user: User
    ) {
        setSelectedUser(user);

        setOpen(true);
    }

    return (
        <div className="space-y-8 p-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <PageHeader
                    title="Пользователи"
                    subtitle="Управление пользователями системы"
                    actions={
                        <Button
                            onClick={handleCreate}
                        >
                            Добавить пользователя
                        </Button>
                    }
                />

            </div>

            <Card className="p-5">

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Поиск пользователя..."
                    leftIcon={
                        <Search
                            size={18}
                        />
                    }
                    rightIcon={
                        search ? (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="transition-colors hover:text-foreground"
                            >
                                <X size={18} />
                            </button>
                        ) : null
                    }
                />

            </Card>

            <UsersTable
                search={search}
                onEdit={handleEdit}
            />

            <UserDialog
                open={open}
                user={selectedUser}
                onClose={() =>
                    setOpen(false)
                }
            />

        </div>
    );
}