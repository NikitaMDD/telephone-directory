import {
    Navigate,
} from "react-router-dom";

import { Loader } from "@/shared/ui/Loader";
import { useAuth } from "@/shared/auth";

export function RootRedirect() {

    const {
        user,
        loading,
    } = useAuth();

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <Navigate
            replace
            to={
                user
                    ? "/admin"
                    : "/login"
            }
        />
    );
}