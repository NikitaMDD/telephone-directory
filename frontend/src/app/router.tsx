import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { DirectoryPage } from "@/pages/public/DirectoryPage";
import { LoginPage } from "@/pages/auth/LoginPage";

import { DashboardPage } from "@/pages/admin/DashboardPage";
import { EmployeesPage } from "@/pages/admin/EmployeesPage";
import { DepartmentsPage } from "@/pages/admin/DepartmentsPage";
import { LocationsPage } from "@/pages/admin/LocationsPage";
import { UsersPage } from "@/pages/admin/UsersPage";
import { LogsPage } from "@/pages/admin/LogsPage";
import { ExportPage } from "@/pages/admin/ExportPage";
import { Guideline } from "@/pages/Guideline/Guideline";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <DirectoryPage />,
            },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "employees",
                element: <EmployeesPage />,
            },
            {
                path: "departments",
                element: <DepartmentsPage />,
            },
            {
                path: "locations",
                element: <LocationsPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "logs",
                element: <LogsPage />,
            },
            {
                path: "export",
                element: <ExportPage />,
            },
            // {
            //     path: "/guideline",
            //     element: <Guideline />,
            // }
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/guideline",
        element: <Guideline />,
    }
]);