import { PropsWithChildren } from "react";
import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/cn";

interface GuidelineBlockProps extends PropsWithChildren {
    title: string;
    className?: string; 
}

export function GuidelineBlock({
    title,
    children,
    className,
}: GuidelineBlockProps) {
    return (
        <div
            className={cn(
                'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-4',
                className
            )}
        >
            <Typography
                variant="bodySmall"
                className="mb-4 text-[var(--color-text-secondary)]"
            >
                Вариант компонента: {title}
            </Typography>
            {children}
        </div>
    )
}