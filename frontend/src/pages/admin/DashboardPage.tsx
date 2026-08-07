import { useMemo } from "react";
import { motion } from "framer-motion";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    Users,
    Building2,
    Building,
    UserCog,
} from "lucide-react";

import { Typography } from "@/shared/ui/Typography";
import { Card } from "@/shared/ui/Card";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { useDepartments } from "@/features/departments/hooks/useDepartments";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { useUsers } from "@/features/users/hooks/useUsers";
 
import { GlassTooltip } from "@/shared/ui/Tooltip";

import { useAuth } from "@/shared/auth";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";

const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
];

export function DashboardPage() {
    const { user } = useAuth();

    const { data: employees = [] } =
        useEmployees();

    const { data: departments = [] } =
        useDepartments();

    const { data: locations = [] } =
        useLocations();

    const { data: users = [] } =
        useUsers();

    const employeesByDepartment =
        useMemo(() => {
            const map: Record<
                string,
                number
            > = {};

            employees.forEach((e) => {
                const name =
                    e.department?.name ??
                    "Без отдела";

                map[name] =
                    (map[name] ?? 0) + 1;
            });

            return Object.entries(map).map(
                ([name, value]) => ({
                    name,
                    value,
                })
            );
        }, [employees]);

    const usersByRole = useMemo(() => {
        const map: Record<
            string,
            number
        > = {};

        users.forEach((u) => {
            map[u.role] =
                (map[u.role] ?? 0) + 1;
        });

        return Object.entries(map).map(
            ([name, value]) => ({
                name,
                value,
            })
        );
    }, [users]);

    return (
        <div className="space-y-8 p-8">

            <PageHeader
                title={`Добро пожаловать, ${user?.name ?? "Администратор"}`}
                subtitle="Система телефонного справочника"
            />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                >
                    <Card className="p-6 flex items-center justify-between">
                        <div>
                            <Typography
                                color="primary"
                                variant="bodySmall"
                            >
                                Сотрудники
                            </Typography>

                            <Typography
                                variant="h1"
                                weight="bold"
                            >
                                {
                                    employees.length
                                }
                            </Typography>
                        </div>

                        <Users className="text-primary" />
                    </Card>
                </motion.div>

                <Card className="p-6 flex items-center justify-between">
                    <div>
                        <Typography
                            color="primary"
                            variant="bodySmall"
                        >
                            Подразделения
                        </Typography>

                        <Typography
                            variant="h1"
                            weight="bold"
                        >
                            {
                                departments.length
                            }
                        </Typography>
                    </div>

                    <Building2 className="text-primary" />
                </Card>

                <Card className="p-6 flex items-center justify-between">
                    <div>
                        <Typography
                            color="primary"
                            variant="bodySmall"
                        >
                            Корпуса
                        </Typography>

                        <Typography
                            variant="h1"
                            weight="bold"
                        >
                            {
                                locations.length
                            }
                        </Typography>
                    </div>

                    <Building className="text-primary" />
                </Card>

                <Card className="p-6 flex items-center justify-between">
                    <div>
                        <Typography
                            color="primary"
                            variant="bodySmall"
                        >
                            Пользователи
                        </Typography>

                        <Typography
                            variant="h1"
                            weight="bold"
                        >
                            {
                                users.length
                            }
                        </Typography>
                    </div>

                    <UserCog className="text-primary" />
                </Card>
            </div>

            <div className="grid gap-6">

                <Card className="p-6">
                    <Typography variant="h2" weight="bold">
                        Сотрудники по подразделениям
                    </Typography>

                    <div className="h-80 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={employeesByDepartment}>
                                <defs>
                                    <linearGradient id="barGlass" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#D44822" stopOpacity={0.85} />
                                        <stop offset="100%" stopColor="#D44822" stopOpacity={0.50} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(17, 17, 17, 0.06)"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="name"
                                    axisLine={{ stroke: "rgba(17, 17, 17, 0.10)" }}
                                    tickLine={false}
                                    tick={{ fill: "#000000", fontSize: 13 }}
                                    dy={8}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#000000", fontSize: 12 }}
                                    allowDecimals={false}
                                />

                                <Tooltip
                                    cursor={{ fill: "rgba(212, 72, 34, 0.06)" }}
                                    content={<GlassTooltip />}
                                />

                                <Bar
                                    dataKey="value"
                                    fill="url(#barGlass)"
                                    stroke="rgba(255, 255, 255, 0.40)"
                                    strokeWidth={1}
                                    radius={[8, 8, 0, 0]}
                                    activeBar={{ fillOpacity: 1 }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

        </div>
    );
}