import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";
import { EmptyState } from "@/shared/ui/EmptyState";

import { useAudit } from "../hooks/useAudit";

export function AuditTable() {
    const {
        data: logs = [],
        isPending,
        isError,
    } = useAudit();

    const sorted = useMemo(() => {
        return [...logs].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    }, [logs]);

    if (isPending) {
        return (
            <Card className="flex items-center justify-center min-h-96">
                <Loader size="lg" />
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="p-6">
                <Typography color="danger">
                    Ошибка загрузки журнала
                    действий
                </Typography>
            </Card>
        );
    }

    if (!sorted.length) {
        return (
            <Card className="p-6">
                <EmptyState
                    title="Нет записей"
                    description="Журнал действий пуст"
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
                            <th className="px-6 py-4 text-left">
                                Дата
                            </th>

                            <th className="px-6 py-4 text-left">
                                Пользователь
                            </th>

                            <th className="px-6 py-4 text-left">
                                Действие
                            </th>

                            <th className="px-6 py-4 text-left">
                                Сущность
                            </th>

                            <th className="px-6 py-4 text-left">
                                ID
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {sorted.map(
                            (log) => (
                                <tr
                                    key={
                                        log.id
                                    }
                                    className="border-t hover:bg-surface"
                                >
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(
                                            log.createdAt
                                        ).toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        {log.user
                                            ?.name ??
                                            "System"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={
                                                log.action ===
                                                "CREATE"
                                                    ? "text-green-600"
                                                    : log.action ===
                                                      "UPDATE"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {
                                                log.action
                                            }
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            log.entity
                                        }
                                    </td>

                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {
                                            log.entityId
                                        }
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