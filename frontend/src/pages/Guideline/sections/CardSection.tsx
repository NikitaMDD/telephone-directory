import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Card } from '@/shared/ui/Card'

export function CardSection() {
    return (
        <GuidelineSection title="Card">
            <GuidelineGrid>
                <GuidelineBlock
                    title="Стандартный"
                >   
                    <Card/>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    );
}