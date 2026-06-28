import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";

import {
    SplashScreen,
    useSplash,
} from "@/features/SplashScreen";

import { AuthProvider } from "@/shared/auth";

export default function App() {
    const {
        finished,
        complete,
    } = useSplash();

    if (!finished) {
        return (
            <SplashScreen
                onFinish={complete}
            />
        );
    }

    return (
        <AuthProvider>
            <RouterProvider
                router={router}
            />
        </AuthProvider>
    );
}