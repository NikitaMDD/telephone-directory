import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Badge } from '@/shared/ui/Badge'

export function BadgeSection() {
    return (
        <GuidelineSection title="Badge">
            <GuidelineGrid>
                <GuidelineBlock
                    title="default"
                >   
                    <Badge variant="default"/>
                </GuidelineBlock>
                <GuidelineBlock
                    title="secondary"
                >   
                    <Badge variant="secondary"/>
                </GuidelineBlock>
                <GuidelineBlock
                    title="warning"
                >   
                    <Badge variant="warning"/>
                </GuidelineBlock>
                <GuidelineBlock
                    title="danger"
                >   
                    <Badge variant="danger"/>
                </GuidelineBlock>
                <GuidelineBlock
                    title="outline"
                >   
                    <Badge variant="outline"/>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    );
}