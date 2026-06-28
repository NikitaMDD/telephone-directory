import type { PropsWithChildren } from "react";

export function DialogFooter({
    children,
}: PropsWithChildren) {
    return (
        <div className="flex justify-end gap-3 border-t px-8 py-5">
            {children}
        </div>
    );
}