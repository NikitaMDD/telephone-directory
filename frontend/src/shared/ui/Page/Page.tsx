import type { ReactNode } from "react";

import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/cn";

interface PageProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function Page({
    title,
    description,
    actions,
    children,
    className,
}: PageProps) {
    return (
        <section
            className={cn(
                "space-y-8",
                className
            )}
        >
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Typography
                        variant="h1"
                        weight="bold"
                    >
                        {title}
                    </Typography>
                    {description && (
                        <Typography
                            variant="body"
                            color="secondary"
                            className="mt-1"
                        >
                            {description}
                        </Typography>
                    )}
                </div>
                {actions}
            </header>
            {children}
        </section>
    );
}