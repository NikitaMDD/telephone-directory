import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { DepartmentsTable } from "@/features/departments/components/DepartmentsTable";
import { DepartmentDialog } from "@/features/departments/components/DepartmentDialog";

import type { Department } from "@/features/departments/types";

export function DepartmentsPage() {
    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);

    const [selectedDepartment, setSelectedDepartment] =
        useState<Department>();

    function handleCreate() {
        setSelectedDepartment(
            undefined
        );

        setOpen(true);
    }

    function handleEdit(
        department: Department
    ) {
        setSelectedDepartment(
            department
        );

        setOpen(true);
    }

    return (
        <div className="space-y-8 p-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <Typography
                        variant="h1"
                        weight="bold"
                    >
                        Подразделения
                    </Typography>

                    <Typography
                        color="secondary"
                    >
                        Управление подразделениями университета
                    </Typography>

                </div>

                <Button
                    onClick={
                        handleCreate
                    }
                >
                    <Plus
                        size={18}
                    />

                    Добавить подразделение
                </Button>

            </div>

            <Card className="p-5">

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Поиск подразделений..."
                    // leftIcon={
                    //     <Search
                    //         size={18}
                    //     />
                    // }
                />

            </Card>

            <DepartmentsTable
                search={search}
                onEdit={handleEdit}
            />

            <DepartmentDialog
                open={open}
                department={
                    selectedDepartment
                }
                onClose={() =>
                    setOpen(false)
                }
            />

        </div>
    );
}