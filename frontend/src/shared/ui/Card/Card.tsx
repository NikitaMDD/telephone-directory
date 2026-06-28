import type {
    HTMLAttributes,
    PropsWithChildren,
} from "react";

import { cn } from "@/shared/lib/cn";

function Card({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>) {
    return (
        <div
            className={cn(
                "rounded-2xl",
                "border",
                "border-border",
                "bg-surface",
                "shadow-sm",
                "transition-shadow",
                "duration-200",
                "hover:shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function Header({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 p-6 pb-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function Title({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLHeadingElement>
>) {
    return (
        <h2
            className={cn(
                "text-xl font-semibold",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

function Description({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLParagraphElement>
>) {
    return (
        <p
            className={cn(
                "text-sm text-text-secondary",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
}

function Content({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>) {
    return (
        <div
            className={cn(
                "p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function Footer({
    className,
    children,
    ...props
}: PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>) {
    return (
        <div
            className={cn(
                "flex items-center justify-end gap-3 px-6 pb-6 pt-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
Card.Footer = Footer;

export { Card };