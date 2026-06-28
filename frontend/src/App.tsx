import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";

import {
    SplashScreen,
    useSplash,
} from "@/features/SplashScreen";

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
        <RouterProvider
            router={router}
        />
    );
}