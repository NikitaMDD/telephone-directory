import { PropsWithChildren } from "react";


export function GuidelineGrid({
    children
}: PropsWithChildren) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {children}
        </div>
    )
}