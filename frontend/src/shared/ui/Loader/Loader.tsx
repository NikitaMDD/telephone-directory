import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

type LoaderSize =
    | "sm"
    | "md"
    | "lg";

interface LoaderProps {
    size?: LoaderSize;
    className?: string;
}

const sizes: Record<
    LoaderSize,
    string
> = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
};

export function Loader({
    size = "md",
    className,
}: LoaderProps) {
    return (
        <motion.div
            animate={{
                rotate: 360,
            }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 0.8,
            }}
            className={cn(
                "rounded-full border-2 border-primary border-t-transparent",
                sizes[size],
                className
            )}
        />
    );
}