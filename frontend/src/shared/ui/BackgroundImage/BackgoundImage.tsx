import type { SVGProps } from "react";
import Maple from "@/assets/TGPU_sign-leaf-rgb.svg?react";
import Name from "@/assets/TGPU_logo-hor-script-rgb.svg?react";

const IMAGES = {
    maple: Maple,
    name: Name,
} as const;

export type ImagePick = keyof typeof IMAGES; // "maple" | "name" — выведется само

interface BackgroundImageProps extends SVGProps<SVGSVGElement> {
    imagePick?: ImagePick;
}

export function BackgroundImage({
    imagePick = "maple",
    className,
    ...rest
}: BackgroundImageProps) {
    const Image = IMAGES[imagePick];

    return <div className={`background-logo ${imagePick === "maple" ? 'background-logo--upper' : 'background-logo--lower'} ${className ?? ""}`}><Image {...rest} /></div>;
}