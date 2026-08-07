import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";
import { EmptyState } from "@/shared/ui/EmptyState";

import { cn } from "@/shared/lib/cn";

import { useAudit } from "../hooks/useAudit";

const ACTION_STYLES = {
    CREATE: "bg-[#2E8B57]/15 text-[#2E8B57] ring-[#2E8B57]/20",
    UPDATE: "bg-[#E8A317]/15 text-[#E8A317] ring-[#E8A317]/20",
    DELETE: "bg-[#D32F2F]/15 text-[#D32F2F] ring-[#D32F2F]/20",
} as const;

const ACTION_DOT = {
    CREATE: "bg-[#2E8B57]",
    UPDATE: "bg-[#E8A317]",
    DELETE: "bg-[#D32F2F]",
} as const;

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
                    Ошибка загрузки журнала действий
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
                <table className="glass-table">

                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Пользователь</th>
                            <th>Действие</th>
                            <th>Сущность</th>
                            <th>ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sorted.map((log) => (
                            <tr key={log.id}>
                                <td className="text-sm text-[#000000]">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>

                                <td>
                                    {log.user?.name ?? "System"}
                                </td>

                                <td>
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
                                            ACTION_STYLES[log.action] ??
                                                "bg-neutral-500/15 text-neutral-600 ring-neutral-500/20"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                ACTION_DOT[log.action] ?? "bg-neutral-500"
                                            )}
                                        />
                                        {log.action}
                                    </span>
                                </td>

                                <td>{log.entity}</td>

                                <td className="text-xs text-[#000000] font-mono">
                                    {log.entityId}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </Card>
    );
}