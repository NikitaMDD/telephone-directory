import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";

import { AuthProvider } from "@/shared/auth";

export default function App() {

    return (
        <AuthProvider>
            <RouterProvider
                router={router}
            />
        </AuthProvider>
    );
}