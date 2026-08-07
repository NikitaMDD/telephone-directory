import { useState } from "react";

import { Plus, Search, X } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";

import { EmployeeDialog } from "@/features/employees/components/EmployeeDialog";
import { EmployeesTable } from "@/features/employees/components/EmployeesTable";

import type { Employee } from "@/features/employees/types";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

export function EmployeesPage() {
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState<Employee | undefined>();

    function handleCreate() {
        setSelectedEmployee(undefined);
        setOpen(true);
    }

    function handleEdit(employee: Employee) {
        setSelectedEmployee(employee);
        setOpen(true);
    }

    return (
        <div className="space-y-8 p-8">

            {/* HEADER */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <PageHeader
                    title="Сотрудники"
                    subtitle="Управление сотрудниками университета"
                    actions={
                        <Button variant="primary" onClick={handleCreate}>
                            Добавить сотрудника
                        </Button>
                    }
                />

            </div>

            <Card className="p-5">

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Поиск сотрудников..."
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

            <EmployeesTable
                search={search}
                onEdit={handleEdit}
            />

            <EmployeeDialog
                open={open}
                employee={selectedEmployee}
                onClose={() => setOpen(false)}
            />

        </div>
    );
}