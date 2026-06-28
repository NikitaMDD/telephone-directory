import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";

import { Typography } from "../Typography";

import Logo from "@/shared/assets/brand/logo.svg";

interface BrandProps {
    title?: string;
    subtitle?: string;
    compact?: boolean;
    showSubtitle?: boolean;
    className?: string;
}

export function Brand({
    title = "Телефонный справочник",
    subtitle = "Университет Льва Толстого",
    compact = false,
    showSubtitle = true,
    className,
}: BrandProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4",
                className
            )}
        >
            <motion.img
                src={Logo}
                alt="Логотип университета"
                className={cn(
                    "shrink-0 object-contain select-none",

                    compact
                        ? "h-10 w-10"
                        : "h-14 w-14"
                )}
                initial={{
                    opacity: 0,
                    scale: 0.85,
                    rotate: -8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut",
                }}
                draggable={false}
            />

            {!compact && (
                <motion.div
                    className="flex flex-col"
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.25,
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                >
                    <Typography
                        variant="title"
                        weight="bold"
                    >
                        {title}
                    </Typography>

                    {showSubtitle && (
                        <Typography
                            variant="caption"
                            color="secondary"
                        >
                            {subtitle}
                        </Typography>
                    )}
                </motion.div>
            )}
        </div>
    );
}