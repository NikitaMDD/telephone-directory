import { useMemo } from "react";
import { motion } from "framer-motion";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
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

import { useAuth } from "@/shared/auth";

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

            <div>
                <Typography
                    variant="h1"
                    weight="bold"
                >
                    Добро пожаловать,{" "}
                    {user?.name ??
                        "Администратор"}{" "}
                </Typography>

                <Typography color="secondary">
                    Система телефонного
                    справочника
                </Typography>
            </div>

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
                                color="secondary"
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
                            color="secondary"
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
                            color="secondary"
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
                            color="secondary"
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

            <div className="grid gap-6 lg:grid-cols-2">

                <Card className="p-6">
                    <Typography
                        variant="h2"
                        weight="bold"
                    >
                        Сотрудники по
                        подразделениям
                    </Typography>

                    <div className="h-80 mt-4">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart
                                data={
                                    employeesByDepartment
                                }
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    fill="#6366f1"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0,
                                    ]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <Typography
                        variant="h2"
                        weight="bold"
                    >
                        Роли пользователей
                    </Typography>

                    <div className="h-80 mt-4">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <PieChart>
                                <Pie
                                    data={
                                        usersByRole
                                    }
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                >
                                    {usersByRole.map(
                                        (
                                            _,
                                            index
                                        ) => (
                                            <Cell
                                                key={
                                                    index
                                                }
                                                fill={
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <Typography
                    variant="h2"
                    weight="bold"
                >
                    Сводка системы
                </Typography>

                <div className="grid md:grid-cols-3 gap-6 mt-4">

                    <div>
                        <Typography
                            color="secondary"
                            variant="bodySmall"
                        >
                            Активные записи
                        </Typography>

                        <Typography
                            variant="h1"
                        >
                            {employees.length +
                                departments.length +
                                locations.length}
                        </Typography>
                    </div>

                    <div>
                        <Typography
                            color="secondary"
                            variant="bodySmall"
                        >
                            Система
                        </Typography>

                        <Typography>
                            Работает стабильно
                        </Typography>
                    </div>

                    <div>
                        <Typography
                            color="secondary"
                            variant="bodySmall"
                        >
                            Статус
                        </Typography>

                        <Typography className="text-green-600">
                            Онлайн
                        </Typography>
                    </div>

                </div>
            </Card>

        </div>
    );
}