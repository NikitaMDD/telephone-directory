import { GuidelineSection } from "../components";
import { GuidelineGrid } from "../components";
import { GuidelineBlock } from "../components";
import { Button } from '@/shared/ui/Button'

export function ButtonSection() {
    return (
        <GuidelineSection title="Button">
            <GuidelineGrid>
                <GuidelineBlock
                    title="default"
                >   
                    <Button variant="primary">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="secondary"
                >   
                    <Button variant="secondary">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="outline"
                >   
                    <Button variant="outline">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="ghost"
                >   
                    <Button variant="ghost">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="danger"
                >   
                    <Button variant="danger">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="размер sm"
                >   
                    <Button variant="danger" size="sm">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="размер md"
                >   
                    <Button variant="danger" size="md">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="размер lg"
                >   
                    <Button variant="danger" size="lg">Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="размер icon"
                >   
                    <Button variant="danger" size="icon">Т</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="Полная ширина"
                >   
                    <Button variant="danger" size="icon" fullWidth={true}>Текст кнопки</Button>
                </GuidelineBlock>
                <GuidelineBlock
                    title="Состояние загрузка"
                >   
                    <Button variant="danger" size="icon" fullWidth={true} isLoading={true}>Текст кнопки</Button>
                </GuidelineBlock>
            </GuidelineGrid>
        </GuidelineSection>
    );
}