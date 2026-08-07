import { useMemo, useState } from "react";

import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";
import { EmptyState } from "@/shared/ui/EmptyState";

import { useEmployees } from "../hooks/useEmployees";

import { EmployeeActions } from "./EmployeeActions";
import { EmployeeDeleteDialog } from "./EmployeeDeleteDialog";

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

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [
        employeeToDelete,
        setEmployeeToDelete,
    ] = useState<Employee>();

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

    function handleOpenDelete(
        employee: Employee
    ) {
        setEmployeeToDelete(employee);
        setDeleteOpen(true);
    }

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

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
        <>
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="glass-table">

                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Должность</th>
                                <th>Подразделение</th>
                                <th>Телефон</th>
                                <th className="w-20" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>
                                        <Typography weight="medium">
                                            {employee.lastName}{" "}
                                            {employee.firstName}{" "}
                                            {employee.middleName}
                                        </Typography>
                                    </td>

                                    <td>{employee.position}</td>

                                    <td>{employee.department.name}</td>

                                    <td>
                                        {employee.internalPhone ??
                                            employee.cityPhone ??
                                            "-"}
                                    </td>

                                    <td>
                                        <EmployeeActions
                                            onEdit={() => onEdit(employee)}
                                            onDelete={() =>
                                                handleOpenDelete(employee)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </Card>

            <EmployeeDeleteDialog
                open={deleteOpen}
                employee={employeeToDelete}
                onClose={handleCloseDelete}
            />
        </>
    );
}