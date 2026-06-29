import {
    ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/shared/ui/Card";
import { Typography } from "@/shared/ui/Typography";

interface Props {
    title: string;
    description: string;
    to: string;
}

export function DashboardQuickAction({
    title,
    description,
    to,
}: Props) {
    return (
        <Link to={to}>
            <Card className="transition hover:border-primary hover:shadow-lg">

                <div className="flex items-center justify-between p-5">

                    <div>

                        <Typography
                            weight="bold"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="secondary"
                        >
                            {description}
                        </Typography>

                    </div>

                    <ChevronRight />

                </div>

            </Card>
        </Link>
    );
}