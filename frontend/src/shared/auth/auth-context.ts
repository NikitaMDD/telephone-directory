import { createContext } from "react";

import type { AuthUser } from "@/features/auth/types";

export interface AuthContextValue {
    user: AuthUser | null;

    loading: boolean;

    login(user: AuthUser): void;

    logout(): Promise<void>;
}

export const AuthContext =
    createContext<AuthContextValue | null>(
        null
    );