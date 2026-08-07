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
        <NavLink to={item.href} end>
            {({ isActive }) => (
                <motion.div
                    initial={false}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                        type: "tween",
                        duration: 0.15,
                        ease: "easeOut",
                    }}
                    title={collapsed ? item.title : undefined}
                    className={cn(
                        "glass-nav-item flex h-11 w-full items-center overflow-hidden px-4",
                        isActive && "glass-nav-item--active"
                    )}
                >
                    <Icon size={20} className="shrink-0" />

                    <motion.span
                        initial={false}
                        animate={{
                            opacity: collapsed ? 0 : 1,
                            width: collapsed ? 0 : "auto",
                            marginLeft: collapsed ? 0 : 12,
                        }}
                        transition={{
                            duration: 0.18,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        aria-hidden={collapsed}
                        className="block overflow-hidden whitespace-nowrap font-medium"
                    >
                        {item.title}
                    </motion.span>
                </motion.div>
            )}
        </NavLink>
    );
}