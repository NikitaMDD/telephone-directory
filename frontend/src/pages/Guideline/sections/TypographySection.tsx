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
                <GuidelineBlock
                    title="h1"
                >
                    <Typography 
                        as="h1"
                        variant="h1"
                    >
                        H1 Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="h2"
                >
                    <Typography 
                        as="h2"
                        variant="h2"
                    >
                        H2 Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="h3"
                >
                    <Typography 
                        as="h3"
                        variant="h3"
                    >
                        H3 Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="Title"
                >
                    <Typography 
                        as="p"
                        variant="title"
                    >
                        Title Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="body"
                >
                    <Typography 
                        as="p"
                        variant="body"
                    >
                        Body Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="bodySmall"
                >
                    <Typography 
                        as="p"
                        variant="bodySmall"
                    >
                        bodySmall Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="caption"
                >
                    <Typography 
                        as="p"
                        variant="caption"
                    >
                        Caption Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="label"
                >
                    <Typography 
                        as="label"
                        variant="label"
                    >
                        Caption Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста primary"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="primary"
                    >
                        Primary Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста secondary"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="secondary"
                    >
                        Secondary Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста tertiary"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="tertiary"
                    >
                        Tertiary Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста danger"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="danger"
                    >
                        Danger Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста success"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="success"
                    >
                        Success Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста warning"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="warning"
                    >
                        Warning Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="цвет текста inherit"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                    >
                        Inherit Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="вес шрифта regular"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="regular"
                    >
                        Regular Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="вес шрифта medium"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="medium"
                    >
                        Medium Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="вес шрифта semibold"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="semibold"
                    >
                        Semibold Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="вес шрифта bold"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="bold"
                    >
                        Bold Typography
                    </Typography>
                </GuidelineBlock>
                {/* <GuidelineBlock
                    title="расположение текста left"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="bold"
                        align="left"
                    >
                        Left Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="расположение текста center"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="bold"
                        align="center"
                    >
                        Center Typography
                    </Typography>
                </GuidelineBlock>
                <GuidelineBlock
                    title="расположение текста right"
                >
                    <Typography 
                        as="span"
                        variant="body"
                        color="inherit"
                        weight="bold"
                        align="right"
                    >
                        Right Typography
                    </Typography>
                </GuidelineBlock> */}
            </GuidelineGrid>
        </GuidelineSection>
    )
}