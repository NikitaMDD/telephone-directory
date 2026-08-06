import { useState } from "react";

import { ChevronLeft } from "lucide-react";

import { motion } from "framer-motion";

import { Brand } from "@/shared/ui/Brand";
import { Button } from "@/shared/ui/Button";
import { NavItem } from "@/shared/ui/NavItem";

import { navigation } from "@/shared/config/navigation";

import { cn } from "@/shared/lib/cn";

interface SidebarProps {
    mobile?: boolean;
    collapsed: boolean;
    onCollapse(): void;
}

export function Sidebar({
    mobile = false,
    collapsed,
    onCollapse,
}: SidebarProps) {

    return (
        <motion.aside
            animate={{
                width: collapsed
                    ? 84
                    : 260,
            }}
            transition={{
                duration: 0.25,
            }}
            className={cn(
                // "flex flex-col border-r glass-sidebar",

                "flex flex-col border-r bg-white",

                mobile
                    ? "h-full w-full"
                    : "hidden lg:flex"
            )}
        >
            <div className="flex items-center justify-end border-b p-5">

                {!mobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCollapse}
                    >
                        <motion.div
                            animate={{
                                rotate: collapsed ? 180 : 0,
                            }}
                        >
                            <ChevronLeft size={18} />
                        </motion.div>
                    </Button>
                )}

            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navigation.map(
                    (item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            collapsed={
                                collapsed
                            }
                        />
                    )
                )}
            </nav>

        </motion.aside>
    );
}