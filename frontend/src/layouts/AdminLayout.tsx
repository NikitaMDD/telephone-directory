import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <main className="min-h-screen">
            <Outlet />
        </main>
    );
}