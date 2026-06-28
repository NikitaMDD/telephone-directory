import { Inbox } from "lucide-react";

import { Typography } from "../Typography";

interface Props {
    title: string;
    description?: string;
}

export function EmptyState({
    title,
    description,
}: Props) {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center gap-4">

            <Inbox
                size={56}
                className="text-muted-foreground"
            />

            <Typography
                variant="h3"
                weight="bold"
            >
                {title}
            </Typography>

            {description && (
                <Typography
                    color="secondary"
                    align="center"
                >
                    {description}
                </Typography>
            )}

        </div>
    );
}