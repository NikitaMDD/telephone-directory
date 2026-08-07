import { Typography } from "@/shared/ui/Typography";

interface GlassTooltipProps {
    active?: boolean;
    label?: string;
    payload?: Array<{ value: number; name: string }>;
}

export function GlassTooltip({ active, payload, label }: GlassTooltipProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className="glass-tooltip">
            <Typography variant="bodySmall" color="secondary">
                {label}
            </Typography>
            <Typography weight="bold">
                {payload[0].value} чел.
            </Typography>
        </div>
    );
}