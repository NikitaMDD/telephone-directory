import { Typography } from "@/shared/ui/Typography";

interface DialogHeaderProps {
    title: string;
    description?: string;
}

export function DialogHeader({
    title,
    description,
}: DialogHeaderProps) {
    return (
        <div className="border-b px-8 py-6">

            <Typography
                variant="h2"
                weight="bold"
            >
                {title}
            </Typography>

            {description && (
                <Typography
                    variant="body"
                    color="secondary"
                    className="mt-2"
                >
                    {description}
                </Typography>
            )}

        </div>
    );
}