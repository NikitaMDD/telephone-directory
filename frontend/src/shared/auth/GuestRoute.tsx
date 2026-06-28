import { Navigate } from "react-router-dom";

import { Loader } from "@/shared/ui/Loader";
import { useAuth } from "./useAuth";

import type { PropsWithChildren } from "react";

export function GuestRoute({
    children,
}: PropsWithChildren) {
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    if (user) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    return children;
}