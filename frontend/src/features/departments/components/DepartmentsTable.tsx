import { useMemo, useState } from "react";

import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Loader } from "@/shared/ui/Loader";
import { Typography } from "@/shared/ui/Typography";

import { useDepartments } from "../hooks/useDepartments";

import { DepartmentActions } from "./DepartmentActions";
import { DepartmentDeleteDialog } from "./DepartmentDeleteDialog";

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

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [
        departmentToDelete,
        setDepartmentToDelete,
    ] = useState<Department>();

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

    function handleOpenDelete(
        department: Department
    ) {
        setDepartmentToDelete(department);
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
        <>
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="glass-table">

                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Тип</th>
                                <th>Корпус</th>
                                <th>Родительское подразделение</th>
                                <th className="w-24" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredDepartments.map((department) => (
                                <tr key={department.id}>
                                    <td>
                                        <Typography weight="medium">
                                            {department.name}
                                        </Typography>

                                        {department.abbreviation && (
                                            <Typography
                                                variant="caption"
                                                color="secondary"
                                            >
                                                {department.abbreviation}
                                            </Typography>
                                        )}
                                    </td>

                                    <td>{department.type}</td>
                                    <td>{department.location.name}</td>
                                    <td>{department.parent?.name ?? "-"}</td>

                                    <td>
                                        <DepartmentActions
                                            onEdit={() => onEdit(department)}
                                            onDelete={() =>
                                                handleOpenDelete(department)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </Card>

            <DepartmentDeleteDialog
                open={deleteOpen}
                department={departmentToDelete}
                onClose={handleCloseDelete}
            />
        </>
    );
}