import { PropsWithChildren } from "react";
import { Typography } from "@/shared/ui/Typography";

interface GuidelineSectionProps extends PropsWithChildren {
    title: string;
}

export function GuidelineSection({
    title,
    children
}: GuidelineSectionProps) {
    return (
        <section className="mb-12">
            <Typography variant="h2">
                {title}
            </Typography>

            <div className="mt-6 border-t border-[var(--color-border)] pt-6">
                {children}
            </div>
        </section>
    );
}