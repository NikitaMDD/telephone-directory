import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

import { cn } from "@/shared/lib/cn";
import { Typography } from "../Typography";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Input = forwardRef<
    HTMLInputElement,
    InputProps
>(
    (
        {
            label,
            error,
            helperText,
            leftSection,
            rightSection,
            leftIcon,
            rightIcon,
            className,
            ...props
        },
        ref
    ) => {
        // Объединяем: если передана иконка, используем её, иначе — section
        const effectiveLeft = leftIcon ?? leftSection;
        const effectiveRight = rightIcon ?? rightSection;

        return (
            <div className="flex flex-col gap-2">

                {label && (
                    <Typography
                        variant="label"
                    >
                        {label}
                    </Typography>
                )}

                <div className="relative">

                    {effectiveLeft && (
                        <div
                            className={cn(
                                "pointer-events-none",
                                "absolute left-3 top-1/2 -translate-y-1/2",
                                "flex items-center justify-center",
                                "text-muted-foreground"
                            )}
                        >
                            {effectiveLeft}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={cn(
                            "h-11 w-full rounded-xl",
                            "border border-border",
                            "bg-background",
                            "px-4",
                            effectiveLeft &&
                                "pl-10",
                            effectiveRight &&
                                "pr-10",
                            "outline-none",
                            "transition-colors",
                            "focus:border-primary",
                            error &&
                                "border-danger",

                            className
                        )}
                        {...props}
                    />

                    {effectiveRight && (
                        <div
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2",
                                "flex items-center justify-center",
                                "text-muted-foreground"
                            )}
                        >
                            {effectiveRight}
                        </div>
                    )}
                </div>

                {error ? (
                    <Typography
                        variant="caption"
                        color="danger"
                    >
                        {error}
                    </Typography>
                ) : helperText ? (
                    <Typography
                        variant="caption"
                        color="secondary"
                    >
                        {helperText}
                    </Typography>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";