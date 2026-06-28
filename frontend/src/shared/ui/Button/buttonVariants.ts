import {
    cva,
    type VariantProps,
} from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-xl",
        "font-medium",
        "transition-colors",
        "duration-200",
        "select-none",
        "whitespace-nowrap",
        "outline-none",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "focus-visible:ring-2",
        "focus-visible:ring-primary",
        "focus-visible:ring-offset-2",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-white hover:opacity-90",
                secondary:
                    "bg-surface border border-border hover:bg-neutral-100",
                outline:
                    "border border-primary text-primary hover:bg-primary hover:text-white",
                ghost:
                    "hover:bg-neutral-100",
                danger:
                    "bg-danger text-white hover:bg-danger/90",
            },
            size: {
                sm:
                    "h-9 px-4 text-sm",
                md:
                    "h-11 px-5 text-base",
                lg:
                    "h-12 px-6 text-base",
                icon:
                    "h-11 w-11",
            },
            fullWidth: {
                true:
                    "w-full",
                false:
                    "",
            },
        },
        defaultVariants: {
            variant:
                "primary",
            size:
                "md",
            fullWidth:
                false,
        },
    }
);

export type ButtonVariants =
    VariantProps<typeof buttonVariants>;