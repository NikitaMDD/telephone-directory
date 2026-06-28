import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";
import { EmptyState } from "@/shared/ui/EmptyState";

import {
    useDeleteEmployee,
    useEmployees,
} from "../hooks/useEmployees";

import { EmployeeActions } from "./EmployeeActions";

import type { Employee } from "../types";

interface Props {
    search: string;
    onEdit(employee: Employee): void;
}

export function EmployeesTable({
    search,
    onEdit,
}: Props) {
    const {
        data: employees = [],
        isPending,
        isError,
    } = useEmployees();

    const deleteMutation =
        useDeleteEmployee();

    const filteredEmployees =
        useMemo(() => {
            const value =
                search.toLowerCase();

            return employees.filter(
                (employee) => {
                    const searchable =
                        `
${employee.lastName}
${employee.firstName}
${employee.middleName ?? ""}
${employee.position}
${employee.internalPhone ?? ""}
${employee.cityPhone ?? ""}
${employee.email ?? ""}
${employee.department.name}
`
                            .toLowerCase();

                    return searchable.includes(
                        value
                    );
                }
            );
        }, [employees, search]);

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
                    Не удалось загрузить сотрудников
                </Typography>
            </Card>
        );
    }

    if (!filteredEmployees.length) {
        return (
            <Card className="flex min-h-96 items-center justify-center">
                <EmptyState
                    title="Сотрудники не найдены"
                    description="Добавьте первого сотрудника."
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
                                ФИО
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Должность
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Подразделение
                            </th>

                            <th className="px-6 py-4 text-left font-semibold">
                                Телефон
                            </th>

                            <th className="w-20" />

                        </tr>

                    </thead>

                    <tbody>

                        {filteredEmployees.map(
                            (
                                employee
                            ) => (
                                <tr
                                    key={
                                        employee.id
                                    }
                                    className="border-t transition-colors hover:bg-surface"
                                >
                                    <td className="px-6 py-4">

                                        <Typography
                                            weight="medium"
                                        >
                                            {
                                                employee.lastName
                                            }{" "}
                                            {
                                                employee.firstName
                                            }{" "}
                                            {employee.middleName}
                                        </Typography>

                                    </td>

                                    <td className="px-6 py-4">

                                        {
                                            employee.position
                                        }

                                    </td>

                                    <td className="px-6 py-4">

                                        {
                                            employee
                                                .department
                                                .name
                                        }

                                    </td>

                                    <td className="px-6 py-4">

                                        {employee.internalPhone ??
                                            employee.cityPhone ??
                                            "-"}

                                    </td>

                                    <td className="px-6 py-4">

                                        <EmployeeActions
                                            onEdit={() =>
                                                onEdit(
                                                    employee
                                                )
                                            }
                                            onDelete={() => {
                                                if (
                                                    window.confirm(
                                                        `Удалить сотрудника "${employee.lastName} ${employee.firstName}"?`
                                                    )
                                                ) {
                                                    deleteMutation.mutate(
                                                        employee.id
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