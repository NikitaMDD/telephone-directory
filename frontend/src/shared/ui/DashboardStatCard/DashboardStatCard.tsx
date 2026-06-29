import type { ReactNode } from "react";

import { Card } from "@/shared/ui/Card";
import { Typography } from "@/shared/ui/Typography";

interface Props {
    title: string;
    value: number;
    icon: ReactNode;
}

export function DashboardStatCard({
    title,
    value,
    icon,
}: Props) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">

                <div>

                    <Typography
                        variant="bodySmall"
                        color="secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h1"
                        weight="bold"
                    >
                        {value}
                    </Typography>

                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                    {icon}
                </div>

            </div>
        </Card>
    );
}