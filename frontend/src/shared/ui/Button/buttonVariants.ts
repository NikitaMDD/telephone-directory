import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "glass-btn",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary: "glass-btn--primary",
                secondary: "glass-btn--ghost",
                outline: "glass-btn--outline",
                ghost: "glass-btn--ghost",
                danger: "glass-btn--danger",
            },
            size: {
                sm: "h-9 px-4 text-sm",
                md: "h-11 px-6 text-sm",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10 p-0",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;