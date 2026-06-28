import type { ElementType, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export type TypographyVariant =
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "title"
    | "body"
    | "bodySmall"
    | "caption"
    | "label";

export type TypographyColor =
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "success"
    | "warning"
    | "inherit";

export type TypographyWeight =
    | "regular"
    | "medium"
    | "semibold"
    | "bold";

export type TypographyAlign =
    | "left"
    | "center"
    | "right";

interface TypographyProps<
    T extends ElementType = "p"
> {
    as?: T;
    children: ReactNode;

    variant?: TypographyVariant;
    color?: TypographyColor;
    weight?: TypographyWeight;
    align?: TypographyAlign;

    className?: string;
}

const variants: Record<
    TypographyVariant,
    string
> = {
    display:
        "font-display text-5xl leading-tight",

    h1:
        "font-display text-4xl leading-tight",

    h2:
        "font-display text-3xl",

    h3:
        "font-display text-2xl",

    title:
        "text-xl",

    body:
        "text-base",

    bodySmall:
        "text-sm",

    caption:
        "text-xs",

    label:
        "text-sm uppercase tracking-wide",
};

const colors: Record<
    TypographyColor,
    string
> = {
    primary:
        "text-text",

    secondary:
        "text-text-secondary",

    tertiary:
        "text-text-tertiary",

    danger:
        "text-danger",

    success:
        "text-success",

    warning:
        "text-warning",

    inherit:
        "text-inherit",
};

const weights: Record<
    TypographyWeight,
    string
> = {
    regular:
        "font-normal",

    medium:
        "font-medium",

    semibold:
        "font-semibold",

    bold:
        "font-bold",
};

const aligns: Record<
    TypographyAlign,
    string
> = {
    left:
        "text-left",

    center:
        "text-center",

    right:
        "text-right",
};

export function Typography<
    T extends ElementType = "p"
>({
    as,
    children,

    variant = "body",
    color = "primary",
    weight = "regular",
    align = "left",

    className,
}: TypographyProps<T>) {
    const Component = as ?? "p";

    return (
        <Component
            className={cn(
                variants[variant],
                colors[color],
                weights[weight],
                aligns[align],
                className
            )}
        >
            {children}
        </Component>
    );
}

Typography.displayName = "Typography";