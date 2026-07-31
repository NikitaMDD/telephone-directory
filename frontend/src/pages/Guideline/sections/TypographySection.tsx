import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Typography } from "@/shared/ui/Typography";

export function TypographySection() {
    return (
        <GuidelineSection title="Typography">
            <GuidelineGrid>
                <GuidelineBlock
                    title="Display"
                >
                    <Typography 
                        as="h1"
                        variant="display"
                    >
                        Display Typography
                    </Typography>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    )
}