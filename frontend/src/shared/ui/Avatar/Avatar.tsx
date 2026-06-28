import { ChevronDown } from "lucide-react";

import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/cn";

interface Props {
    name: string;
    className?: string;
}

export function Avatar({
    name,
    className,
}: Props) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <button
            className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-surface",
                className
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {initials}
            </div>

            <div className="hidden text-left lg:block">
                <Typography
                    variant="bodySmall"
                    weight="semibold"
                >
                    {name}
                </Typography>

                <Typography
                    variant="caption"
                    color="secondary"
                >
                    Администратор
                </Typography>
            </div>

            <ChevronDown
                size={16}
                className="hidden lg:block"
            />
        </button>
    );
}