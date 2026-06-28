import {
    Navigate,
} from "react-router-dom";

import { Loader } from "@/shared/ui/Loader";

import { useAuth } from "./useAuth";

import type {
    PropsWithChildren,
} from "react";

export function ProtectedRoute({
    children,
}: PropsWithChildren) {
    const {
        user,
        loading,
    } = useAuth();

    console.log("ProtectedRoute", {
        loading,
        user,
    });

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}