import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Typography } from "@/shared/ui/Typography";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    subtitle,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "glass-card flex w-full items-center justify-between gap-4 px-6 py-5",
                className
            )}
        >
            <div className="min-w-0">
                <Typography variant="h1" weight="bold">
                    {title}
                </Typography>

                {subtitle && (
                    <Typography color="primary" variant="bodySmall">
                        {subtitle}
                    </Typography>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-3">
                    {actions}
                </div>
            )}
        </header>
    );
}