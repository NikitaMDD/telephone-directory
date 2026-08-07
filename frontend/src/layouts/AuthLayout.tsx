import { Outlet } from "react-router-dom";
import { BackgroundsLayer } from "@/shared/ui/BackgroundsLayer";

export function AuthLayout() {
    return (
        <div>
            <BackgroundsLayer/>
            <Outlet />
        </div>
    );
}