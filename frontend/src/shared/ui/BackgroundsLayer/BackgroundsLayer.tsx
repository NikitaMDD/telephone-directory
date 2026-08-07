import {BackgroundImage} from "@/shared/ui/BackgroundImage";

export function BackgroundsLayer() {
    return (
        <div className="background-layer" aria-hidden="true">
            <BackgroundImage />
            {/* <BackgroundImage imagePick="name" /> */}
        </div>
    )
}