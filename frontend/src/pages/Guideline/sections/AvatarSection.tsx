import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Avatar } from '@/shared/ui/Avatar'

export function AvatarSection() {
    return (
        <GuidelineSection title="Avatar">
            <GuidelineGrid>
                <GuidelineBlock
                    title="Меняется только имя"
                >   
                    <Avatar name="Админ"/>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    );
}