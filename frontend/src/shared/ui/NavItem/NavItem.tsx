import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";

import type { NavigationItem } from "@/shared/config/navigation";

interface Props {
    item: NavigationItem;
    collapsed?: boolean;
}

export function NavItem({
    item,
    collapsed = false,
}: Props) {
    const Icon = item.icon;

    return (
        <NavLink to={item.href}>
            {({ isActive }) => (
                <motion.div
                    whileHover={{
                        x: 4,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    className={cn(
                        "flex h-11 items-center rounded-xl transition-all duration-200",

                        collapsed
                            ? "justify-center"
                            : "gap-3 px-4",

                        isActive
                            ? "bg-primary text-white shadow"
                            : "text-text-secondary hover:bg-surface hover:text-text"
                    )}
                >
                    <Icon size={20} />

                    {!collapsed && (
                        <span className="font-medium">
                            {item.title}
                        </span>
                    )}
                </motion.div>
            )}
        </NavLink>
    );
}