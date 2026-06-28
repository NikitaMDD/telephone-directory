import {
    forwardRef,
    type ButtonHTMLAttributes,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/shared/lib/cn";

import {
    buttonVariants,
    type ButtonVariants,
} from "./buttonVariants";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        ButtonVariants {
    isLoading?: boolean;
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            isLoading = false,
            disabled,
            children,
            type = "button",
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                whileHover={{
                    scale: 1.02,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                transition={{
                    duration: 0.15,
                    ease: "easeOut",
                }}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fullWidth,
                    }),
                    className
                )}
                {...props}
            >
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.span
                            key="spinner"
                            initial={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                        />
                    )}
                </AnimatePresence>
                <span>{children}</span>
            </motion.button>
        );
    }
);

Button.displayName = "Button";