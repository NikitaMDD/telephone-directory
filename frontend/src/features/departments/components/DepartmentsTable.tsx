import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";

import {
    useDeleteDepartment,
    useDepartments,
} from "../hooks/useDepartments";

import { DepartmentActions } from "./DepartmentActions";

import type { Department } from "../types";

interface Props {
    search: string;
    onEdit(
        department: Department
    ): void;
}

export function DepartmentsTable({
    search,
    onEdit,
}: Props) {
    const {
        data: departments = [],
        isPending,
        isError,
    } = useDepartments();

    const deleteMutation =
        useDeleteDepartment();

    const filteredDepartments =
        useMemo(() => {
            const value =
                search.toLowerCase();

            return departments.filter(
                (
                    department
                ) => {
                    const searchable =
                        `
${department.name}
${department.abbreviation ?? ""}
${department.type}
${department.location.name}
${department.parent?.name ?? ""}
`
                            .toLowerCase();

                    return searchable.includes(
                        value
                    );
                }
            );
        }, [departments, search]);

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
                    Не удалось загрузить подразделения
                </Typography>
            </Card>
        );
    }

    if (!filteredDepartments.length) {
        return (
            <Card>
                <EmptyState
                    title="Подразделения не найдены"
                    description="Добавьте первое подразделение."
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
                                Название
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Тип
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Корпус
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Родительское подразделение
                            </th>

                            <th className="w-24" />

                        </tr>

                    </thead>

                    <tbody>

                        {filteredDepartments.map(
                            (
                                department
                            ) => (
                                <tr
                                    key={
                                        department.id
                                    }
                                    className="border-t transition-colors hover:bg-surface"
                                >
                                    <td className="px-6 py-4">

                                        <Typography
                                            weight="medium"
                                        >
                                            {
                                                department.name
                                            }
                                        </Typography>

                                        {department.abbreviation && (
                                            <Typography
                                                variant="caption"
                                                color="secondary"
                                            >
                                                {
                                                    department.abbreviation
                                                }
                                            </Typography>
                                        )}

                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            department.type
                                        }
                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            department
                                                .location
                                                .name
                                        }
                                    </td>

                                    <td className="px-6 py-4">

                                        {department
                                            .parent
                                            ?.name ??
                                            "-"}

                                    </td>

                                    <td className="px-6 py-4">

                                        <DepartmentActions
                                            onEdit={() =>
                                                onEdit(
                                                    department
                                                )
                                            }
                                            onDelete={() => {
                                                if (
                                                    window.confirm(
                                                        `Удалить подразделение "${department.name}"?`
                                                    )
                                                ) {
                                                    deleteMutation.mutate(
                                                        department.id
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