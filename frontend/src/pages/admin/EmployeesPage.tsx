import { useMemo, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Page } from "@/shared/ui/Page";

import { EmployeeDialog } from "@/features/employees/components/EmployeeDialog";
import { EmployeesTable } from "@/features/employees/components/EmployeesTable";

import type { Employee } from "@/features/employees/types";

export function EmployeesPage() {
    const [search, setSearch] =
        useState("");

    const [
        dialogOpen,
        setDialogOpen,
    ] = useState(false);

    const [
        selectedEmployee,
        setSelectedEmployee,
    ] = useState<
        Employee | undefined
    >();

    const handleCreate = () => {
        setSelectedEmployee(
            undefined
        );

        setDialogOpen(true);
    };

    const handleEdit = (
        employee: Employee
    ) => {
        setSelectedEmployee(
            employee
        );

        setDialogOpen(true);
    };

    const handleClose = () => {
        setSelectedEmployee(
            undefined
        );

        setDialogOpen(false);
    };

    const actions = useMemo(
        () => (
            <Button
                onClick={
                    handleCreate
                }
            >
                Добавить сотрудника
            </Button>
        ),
        []
    );

    return (
        <>
            <Page
                title="Сотрудники"
                description="Управление сотрудниками университета"
                actions={actions}
            >
                <Input
                    placeholder="Поиск сотрудника..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <EmployeesTable
                    search={search}
                    onEdit={
                        handleEdit
                    }
                />
            </Page>

            <EmployeeDialog
                open={dialogOpen}
                employee={
                    selectedEmployee
                }
                onClose={
                    handleClose
                }
            />
        </>
    );
}