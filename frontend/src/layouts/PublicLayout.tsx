import { Outlet } from "react-router-dom";
import { BackgroundsLayer } from "@/shared/ui/BackgroundsLayer";

export function PublicLayout() {
    return (
        <main className="min-h-screen">
            <BackgroundsLayer/>
            <Outlet />
        </main>
    );
}