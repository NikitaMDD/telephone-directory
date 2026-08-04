import { useMemo, useState } from "react";

import { LogIn, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { useDepartments } from "@/features/departments/hooks/useDepartments";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

export function DirectoryPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const { data: employees = [] } = useEmployees();
    const { data: departments = [] } = useDepartments();

    // GROUP BY DEPARTMENT
    const grouped = useMemo(() => {
        const map: Record<string, any[]> = {};

        departments.forEach((d) => {
            map[d.id] = [];
        });

        employees.forEach((e) => {
            const deptId = e.departmentId;

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

    // SEARCH FILTER
    const filtered = useMemo(() => {
        if (!search) return grouped;

        const q = search.toLowerCase();

        return grouped
            .map((g) => ({
                ...g,
                employees: g.employees.filter((e) =>
                    `${e.lastName} ${e.firstName} ${e.position}`
                        .toLowerCase()
                        .includes(q)
                ),
            }))
            .filter(
                (g) =>
                    g.employees.length > 0 ||
                    g.department.name.toLowerCase().includes(q)
            );
    }, [search, grouped]);

    return (
        <div className="space-y-8 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <Typography variant="h1" weight="bold">
                        Телефонный справочник
                    </Typography>

                    <Typography color="secondary">
                        Ректорат и структурные подразделения
                    </Typography>
                </div>

                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/login")}
                >
                    <LogIn size={18} />
                    Войти
                </Button>
            </div>

            {/* SEARCH */}
            <Card className="p-5">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по справочнику..."
                    leftIcon={<Search size={18} />}
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

            {/* DIRECTORY */}
            <div className="space-y-8">
                {filtered.map(({ department, employees }) => (
                    <Card key={department.id} className="p-6">
                        {/* DEPARTMENT HEADER */}
                        <div className="mb-4">
                            <Typography variant="h2" weight="bold">
                                {department.name}
                            </Typography>

                            <Typography color="secondary">
                                {department.type}
                            </Typography>
                        </div>

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-5 gap-4 text-sm font-semibold border-b pb-2 mb-2">
                            <div>ФИО</div>
                            <div>Должность</div>
                            <div>Внутр.</div>
                            <div>Город.</div>
                            <div>Каб.</div>
                        </div>

                        {/* EMPLOYEES */}
                        <div className="space-y-2">
                            {employees.map((e) => (
                                <div
                                    key={e.id}
                                    className="grid grid-cols-5 gap-4 text-sm py-2 border-b last:border-0"
                                >
                                    <div>
                                        {e.lastName} {e.firstName}
                                    </div>
                                    <div>{e.position}</div>
                                    <div>{e.internalPhone ?? "-"}</div>
                                    <div>{e.cityPhone ?? "-"}</div>
                                    <div>{e.room ?? "-"}</div>
                                </div>
                            ))}

                            {employees.length === 0 && (
                                <div className="text-sm text-muted-foreground py-4">
                                    Нет сотрудников
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}