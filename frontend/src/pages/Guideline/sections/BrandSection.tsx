import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Brand } from '@/shared/ui/Brand'

export function BrandSection() {
    return (
        <GuidelineSection title="Brand">
            <GuidelineGrid>
                <GuidelineBlock
                    title="Стандартный"
                >   
                    <Brand/>
                </GuidelineBlock>
                <GuidelineBlock
                    title="Компактный"
                >   
                    <Brand compact/>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    );
}