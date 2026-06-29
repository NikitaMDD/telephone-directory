import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { EmployeeDialog } from "@/features/employees/components/EmployeeDialog";
import { EmployeesTable } from "@/features/employees/components/EmployeesTable";

import type { Employee } from "@/features/employees/types";

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

                <div>
                    <Typography
                        variant="h1"
                        weight="bold"
                    >
                        Сотрудники
                    </Typography>

                    <Typography color="secondary">
                        Управление сотрудниками университета
                    </Typography>
                </div>

                <Button onClick={handleCreate}>
                    Добавить сотрудника
                </Button>

            </div>

            {/* SEARCH */}
            <Card className="p-5">

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Поиск сотрудников..."
                    // leftIcon={
                    //     <Search size={18} />
                    // }
                />

            </Card>

            {/* TABLE */}
            <EmployeesTable
                search={search}
                onEdit={handleEdit}
            />

            {/* DIALOG */}
            <EmployeeDialog
                open={open}
                employee={selectedEmployee}
                onClose={() => setOpen(false)}
            />

        </div>
    );
}