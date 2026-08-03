import { ChevronLeft } from "lucide-react";

import { motion } from "framer-motion";

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
            initial={false}
            animate={{
                width: collapsed
                    ? 84
                    : 260,
            }}
            transition={{
                duration: 0.18,
                ease: [0.4, 0, 0.2, 1],
            }}
            className={cn(
                "flex flex-col overflow-hidden border-r bg-white",

                mobile
                    ? "h-full w-full"
                    : "hidden lg:flex"
            )}
        >
            <div className="flex shrink-0 items-center justify-end border-b p-5">
                {!mobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCollapse}
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                rotate: collapsed
                                    ? 180
                                    : 0,
                            }}
                            transition={{
                                duration: 0.18,
                                ease: "easeOut",
                            }}
                        >
                            <ChevronLeft size={18} />
                        </motion.div>
                    </Button>
                )}
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
                {navigation.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </nav>
        </motion.aside>
    );
}