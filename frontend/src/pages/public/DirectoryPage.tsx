import { useMemo, useState } from "react";

import { LogIn, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { useDepartments } from "@/features/departments/hooks/useDepartments";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";
import { ExportPage } from "../admin/ExportPage";

import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

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
            {/* PAGE HEADER — стеклянная панель */}
            <PageHeader
                title={`Телефонный справочник`}
                subtitle="Ректорат и структурные подразделения"
                actions={
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate("/login")}
                    >
                        <LogIn size={18} />
                        Войти
                    </Button>
                }
            />

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
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[#5F5F5F] transition-colors hover:bg-white/50 hover:text-[#111]"
                                aria-label="Очистить поиск"
                            >
                                <X size={16} />
                            </button>
                        ) : null
                    }
                />
            </Card>

            {/* DIRECTORY */}
            <div className="space-y-8">
                {filtered.map(({ department, employees }) => (
                    <Card key={department.id} className="p-6">
                        <div className="mb-5">
                            <Typography variant="h2" weight="bold">
                                {department.name}
                            </Typography>

                            <Typography color="secondary">
                                {department.type}
                            </Typography>
                        </div>

                        {/* TABLE HEADER */}
                        <div className="glass-list-header grid grid-cols-6 gap-4">
                            <div>ФИО</div>
                            <div>Должность</div>
                            <div>Email</div>
                            <div>Внутр.</div>
                            <div>Город.</div>
                            <div>Каб.</div>
                        </div>

                        {/* EMPLOYEES */}
                        <div>
                            {employees.map((e) => (
                                <div
                                    key={e.id}
                                    className="glass-list-row grid grid-cols-6 gap-4"
                                >
                                    <div>
                                        {e.lastName} {e.firstName}
                                    </div>
                                    <div>{e.position}</div>
                                    <div>{e.email}</div>
                                    <div>{e.internalPhone ?? "-"}</div>
                                    <div>{e.cityPhone ?? "-"}</div>
                                    <div>{e.room ?? "-"}</div>
                                </div>
                            ))}

                            {employees.length === 0 && (
                                <div className="px-6 py-4 text-sm text-[#8A8A8A]">
                                    Нет сотрудников
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
            <ExportPage className="p-0" />
        </div>
    );
}