import type {
    HTMLAttributes,
} from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",

        "rounded-full",

        "px-3",

        "py-1",

        "text-xs",

        "font-medium",

        "select-none",
    ],
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white",

                secondary:
                    "bg-neutral-200 text-neutral-700",

                success:
                    "bg-green-100 text-green-700",

                warning:
                    "bg-yellow-100 text-yellow-700",

                danger:
                    "bg-red-100 text-red-700",

                outline:
                    "border border-border bg-transparent",
            },
        },

        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({
    className,
    variant,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                badgeVariants({
                    variant,
                }),
                className
            )}
            {...props}
        />
    );
}