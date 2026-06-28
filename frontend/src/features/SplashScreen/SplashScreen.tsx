import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Brand } from "@/shared/ui/Brand";

import introVideo from "@/shared/assets/video/intro.mp4";

interface Props {
    onFinish(): void;
}

export function SplashScreen({
    onFinish,
}: Props) {
    const [fadeOut, setFadeOut] =
        useState(false);

    const handleEnded = () => {
        setFadeOut(true);

        setTimeout(() => {
            onFinish();
        }, 900);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: fadeOut
                        ? 0
                        : 1,
                }}
                transition={{
                    duration: 0.8,
                }}
                className="fixed inset-0 z-[999] overflow-hidden bg-black"
            >
                <motion.video
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleEnded}
                    initial={{
                        opacity: 0,
                        scale: 1.05,
                    }}
                    animate={{
                        opacity: 1,
                        scale: fadeOut
                            ? 1.1
                            : 1,
                    }}
                    transition={{
                        duration: 1.4,
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source
                        src={introVideo}
                        type="video/mp4"
                    />
                </motion.video>

                {/* <motion.div
                    animate={{
                        opacity: fadeOut
                            ? 0.9
                            : 1,
                        backdropFilter:
                            fadeOut
                                ? "blur(10px)"
                                : "blur(2px)",
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="absolute inset-0 bg-black/45"
                /> */}

                {/* <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: fadeOut
                                ? 0
                                : 1,
                            scale: fadeOut
                                ? 1.08
                                : 1,
                        }}
                        transition={{
                            delay: 0.6,
                            duration: 0.8,
                        }}
                    >
                        <Brand />
                    </motion.div>
                </div> */}
            </motion.div>
        </AnimatePresence>
    );
}