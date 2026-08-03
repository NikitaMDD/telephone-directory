import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithChildren } from "react";

import { Button } from "@/shared/ui/Button";

import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";

interface RootProps extends PropsWithChildren {
    open: boolean;
    onOpenChange(open: boolean): void;
}

function Root({
    open,
    onOpenChange,
    children,
}: RootProps) {
    const preventCloseIfSelectOpen = (event: any) => {
        const originalEvent = event?.detail?.originalEvent;

        const target =
            originalEvent?.composedPath?.()[0] ??
            originalEvent?.target ??
            event?.target;

        const selectOpenByBodyFlag =
            document.body.hasAttribute("data-select-open");

        const selectOpenByDropdown =
            document.querySelector("[data-select-dropdown]") !== null;

        const clickInsideSelect =
            target instanceof Element &&
            target.closest("[data-select-dropdown]") !== null;

        // console.log("selectOpenByBodyFlag: ", selectOpenByBodyFlag);
        // console.log("selectOpenByDropdown: ", selectOpenByDropdown);
        // console.log("clickInsideSelect: ", clickInsideSelect);
        // console.log("target: ", target);

        if (
            selectOpenByBodyFlag ||
            selectOpenByDropdown ||
            clickInsideSelect
        ) {
            event.preventDefault();
        }
    };

    return (
        <RadixDialog.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <AnimatePresence>
                {open && (
                    <RadixDialog.Portal forceMount>

                        <RadixDialog.Overlay asChild>
                            <motion.div
                                className="
                                    fixed
                                    inset-0
                                    z-50
                                    bg-black/50
                                    backdrop-blur-sm
                                "
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                            />
                        </RadixDialog.Overlay>

                        <div
                            className="
                                fixed
                                inset-0
                                z-50
                                flex
                                items-center
                                justify-center
                                p-4
                                pointer-events-none
                            "
                        >

                            <RadixDialog.Content
                                asChild
                                onPointerDownOutside={preventCloseIfSelectOpen}
                                onInteractOutside={preventCloseIfSelectOpen}
                            >

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.96,
                                        y: 24,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.96,
                                        y: 24,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="
                                        relative
                                        flex
                                        w-full
                                        max-w-2xl
                                        flex-col
                                        overflow-hidden
                                        rounded-2xl
                                        bg-white
                                        shadow-2xl
                                        pointer-events-auto
                                    "
                                >

                                    <RadixDialog.Close asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-4 top-4 z-10"
                                        >
                                            <X size={18} />
                                        </Button>
                                    </RadixDialog.Close>

                                    {children}

                                </motion.div>

                            </RadixDialog.Content>

                        </div>

                    </RadixDialog.Portal>
                )}
            </AnimatePresence>
        </RadixDialog.Root>
    );
}

function Content({
    children,
}: PropsWithChildren) {
    return (
        <div className="max-h-[70vh] overflow-y-auto px-8 py-6">
            {children}
        </div>
    );
}

type DialogComponent = typeof Root & {
    Header: typeof DialogHeader;
    Content: typeof Content;
    Footer: typeof DialogFooter;
};

export const Dialog: DialogComponent =
    Object.assign(Root, {
        Header: DialogHeader,
        Content,
        Footer: DialogFooter,
    });