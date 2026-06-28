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
            className,
            ...props
        },
        ref
    ) => {
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

                    {leftSection && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {leftSection}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={cn(
                            "h-11 w-full rounded-xl",
                            "border border-border",
                            "bg-background",

                            "px-4",

                            leftSection &&
                                "pl-10",

                            rightSection &&
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

                    {rightSection && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {rightSection}
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