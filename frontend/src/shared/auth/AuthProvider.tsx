import {
    useEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";

import { authApi } from "@/shared/api";

import type { AuthUser } from "@/features/auth/types";

import { AuthContext } from "./auth-context";

export function AuthProvider({
    children,
}: PropsWithChildren) {
    const [user, setUser] =
        useState<AuthUser | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        console.log("AuthProvider user:", user);
    }, [user]);

    useEffect(() => {
        authApi
            .me()
            .then((data) => {
                setUser(data.user);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const value = useMemo(
        () => ({
            user,

            loading,

            login(
                user: AuthUser
            ) {
                setUser(user);
            },

            async logout() {
                await authApi.logout();

                setUser(null);
            },
        }),
        [user, loading]
    );

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}