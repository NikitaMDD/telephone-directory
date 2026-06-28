import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/shared/ui/Button";
import { Sidebar } from "@/shared/ui/Sidebar";

interface Props {
    open: boolean;
    collapsed: boolean;
    onCollapse(): void;
    onClose(): void;
}

export function MobileMenu({
    open,
    collapsed,
    onClose,
    onCollapse,
}: Props) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl lg:hidden"
                        initial={{
                            x: -320,
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: -320,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        <div className="flex justify-end p-4">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={onClose}
                            >
                                <X size={20} />
                            </Button>
                        </div>
                        <Sidebar
                            mobile
                            collapsed={collapsed}
                            onCollapse={onCollapse}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}