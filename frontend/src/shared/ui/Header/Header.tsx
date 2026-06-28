import { Menu } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Brand } from "@/shared/ui/Brand";
import { Avatar } from "@/shared/ui/Avatar";

interface Props {
    onMenuClick(): void;
}

export function Header({
    onMenuClick,
}: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">

            <div className="flex items-center gap-4">

                <Button
                    size="icon"
                    variant="ghost"
                    className="lg:hidden"
                    onClick={onMenuClick}
                >
                    <Menu size={20} />
                </Button>

                <Brand compact />

            </div>

            <Avatar
                name="Системный администратор"
            />

        </header>
    );
}