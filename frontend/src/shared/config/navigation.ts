import type { LucideIcon } from "lucide-react";

import {
    LayoutDashboard,
    Users,
    Building2,
    MapPinned,
    Shield,
    FileClock,
    FileDown,
} from "lucide-react";

export interface NavigationItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
    {
        title: "Главная",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Сотрудники",
        href: "/admin/employees",
        icon: Users,
    },
    {
        title: "Подразделения",
        href: "/admin/departments",
        icon: Building2,
    },
    {
        title: "Корпуса",
        href: "/admin/locations",
        icon: MapPinned,
    },
    {
        title: "Пользователи",
        href: "/admin/users",
        icon: Shield,
    },
    {
        title: "Журнал",
        href: "/admin/logs",
        icon: FileClock,
    },
    {
        title: "Экспорт",
        href: "/admin/export",
        icon: FileDown,
    },
];