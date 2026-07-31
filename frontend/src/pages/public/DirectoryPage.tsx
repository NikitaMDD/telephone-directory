import { useMemo } from "react";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { useDepartments } from "@/features/departments/hooks/useDepartments";

import { Typography } from "@/shared/ui/Typography";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";

import { useState } from "react";

export function DirectoryPage() {
    const [search, setSearch] =
        useState("");

    const { data: employees = [] } =
        useEmployees();

    const { data: departments = [] } =
        useDepartments();

    // 🔥 GROUP BY DEPARTMENT (главная логика ТЗ)
    const grouped = useMemo(() => {
        const map: Record<
            string,
            any[]
        > = {};

        departments.forEach((d) => {
            map[d.id] = [];
        });

        employees.forEach((e) => {
            const deptId =
                e.departmentId;

            if (!map[deptId]) {
                map[deptId] = [];
            }

            map[deptId].push(e);
        });

        return departments.map((d) => ({
            department: d,
            employees: map[d.id] ?? [],
        }));
    }, [employees, departments]);

    // 🔎 SEARCH FILTER
    const filtered = useMemo(() => {
        if (!search) return grouped;

        const q = search.toLowerCase();

        return grouped
            .map((g) => ({
                ...g,
                employees: g.employees.filter(
                    (e) =>
                        `${e.lastName} ${e.firstName} ${e.position}`
                            .toLowerCase()
                            .includes(q)
                ),
            }))
            .filter(
                (g) =>
                    g.employees.length > 0 ||
                    g.department.name
                        .toLowerCase()
                        .includes(q)
            );
    }, [search, grouped]);

    return (
        <div className="space-y-8 p-8">

            {/* HEADER */}
            <div>
                <Typography
                    variant="h1"
                    weight="bold"
                >
                    Телефонный справочник
                </Typography>

                <Typography color="secondary">
                    Ректорат и структурные
                    подразделения
                </Typography>
            </div>

            {/* SEARCH */}
            <Card className="p-5">
                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Поиск по справочнику..."
                />
            </Card>

            {/* DIRECTORY */}
            <div className="space-y-8">

                {filtered.map(
                    ({
                        department,
                        employees,
                    }) => (
                        <Card
                            key={department.id}
                            className="p-6"
                        >

                            {/* DEPARTMENT HEADER */}
                            <div className="mb-4">
                                <Typography
                                    variant="h2"
                                    weight="bold"
                                >
                                    {
                                        department.name
                                    }
                                </Typography>

                                <Typography
                                    color="secondary"
                                >
                                    {
                                        department.type
                                    }
                                </Typography>
                            </div>

                            {/* TABLE HEADER */}
                            <div className="grid grid-cols-5 text-sm font-semibold border-b pb-2 mb-2">
                                <div>
                                    ФИО
                                </div>
                                <div>
                                    Должность
                                </div>
                                <div>
                                    Внутр.
                                </div>
                                <div>
                                    Город.
                                </div>
                                <div>
                                    Каб.
                                </div>
                            </div>

                            {/* EMPLOYEES */}
                            <div className="space-y-2">

                                {employees.map(
                                    (
                                        e
                                    ) => (
                                        <div
                                            key={
                                                e.id
                                            }
                                            className="grid grid-cols-5 text-sm py-2 border-b last:border-0"
                                        >

                                            <div>
                                                {
                                                    e.lastName
                                                }{" "}
                                                {
                                                    e.firstName
                                                }
                                            </div>

                                            <div>
                                                {
                                                    e.position
                                                }
                                            </div>

                                            <div>
                                                {
                                                    e.internalPhone ??
                                                    "-"
                                                }
                                            </div>

                                            <div>
                                                {
                                                    e.cityPhone ??
                                                    "-"
                                                }
                                            </div>

                                            <div>
                                                {
                                                    e.room ??
                                                    "-"
                                                }
                                            </div>

                                        </div>
                                    )
                                )}

                                {employees.length ===
                                    0 && (
                                    <div className="text-sm text-muted-foreground py-4">
                                        Нет
                                        сотрудников
                                    </div>
                                )}

                            </div>

                        </Card>
                    )
                )}

            </div>
        </div>
    );
}