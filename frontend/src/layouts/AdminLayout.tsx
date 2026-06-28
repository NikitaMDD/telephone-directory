import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/shared/ui/Header";
import { Sidebar } from "@/shared/ui/Sidebar";
import { MobileMenu } from "@/shared/ui/MobileMenu";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

export function AdminLayout() {
    const [collapsed, setCollapsed] =
        useState(false);
    const [mobileOpen, setMobileOpen] =
        useState(false);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                collapsed={collapsed}
                onCollapse={() =>
                    setCollapsed(
                        !collapsed
                    )
                }
            />

            <MobileMenu
                open={mobileOpen}
                collapsed={collapsed}
                onCollapse={() =>
                    setCollapsed(!collapsed)
                }
                onClose={() =>
                    setMobileOpen(false)
                }
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    onMenuClick={() =>
                        setMobileOpen(true)
                    }
                />
                <main className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}