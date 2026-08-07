import * as RadixSelect from "@radix-ui/react-select";

import {
    Check,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import {
    useEffect,
    useRef,
} from "react";

import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/cn";

let openSelectCount = 0;
let removeSelectFlagTimeout: ReturnType<typeof setTimeout> | undefined;

function setSelectOpenFlag(open: boolean) {
    if (removeSelectFlagTimeout) {
        clearTimeout(removeSelectFlagTimeout);
    }

    if (open) {
        openSelectCount += 1;
        document.body.setAttribute("data-select-open", "true");
        return;
    }

    openSelectCount = Math.max(0, openSelectCount - 1);

    if (openSelectCount === 0) {
        removeSelectFlagTimeout = setTimeout(() => {
            document.body.removeAttribute("data-select-open");
        }, 250);
    }
}

interface Props<T> {
    label?: string;
    placeholder?: string;
    items: readonly T[];
    value?: string;
    error?: string;
    disabled?: boolean;
    onValueChange(value: string): void;
    getLabel(item: T): string;
    getValue(item: T): string;
}

export function Select<T>({
    label,
    placeholder = "Выберите...",
    items,
    value,
    error,
    disabled,
    onValueChange,
    getLabel,
    getValue,
}: Props<T>) {
    const isOpenRef = useRef(false);

    const handleOpenChange = (nextOpen: boolean) => {
        if (isOpenRef.current === nextOpen) {
            return;
        }

        isOpenRef.current = nextOpen;
        setSelectOpenFlag(nextOpen);
    };

    useEffect(() => {
        return () => {
            if (isOpenRef.current) {
                isOpenRef.current = false;
                setSelectOpenFlag(false);
            }
        };
    }, []);

    return (
        <div className="space-y-2">

            {label && (
                <Typography variant="label" weight="medium">
                    {label}
                </Typography>
            )}

            <RadixSelect.Root
                value={value}
                disabled={disabled}
                onValueChange={onValueChange}
                onOpenChange={handleOpenChange}
            >

                <RadixSelect.Trigger
                    className={cn(
                        "glass-select-trigger",
                        error && "glass-select-trigger--error"
                    )}
                >

                    <RadixSelect.Value placeholder={placeholder} />

                    <RadixSelect.Icon>
                        <ChevronDown size={18} />
                    </RadixSelect.Icon>

                </RadixSelect.Trigger>

                <RadixSelect.Portal>

                    <RadixSelect.Content
                        position="popper"
                        data-select-dropdown="true"
                        className="glass-select-dropdown z-[100] pointer-events-auto"
                    >

                        <RadixSelect.ScrollUpButton className="glass-select-scroll-btn">
                            <ChevronUp size={16} />
                        </RadixSelect.ScrollUpButton>

                        <RadixSelect.Viewport className="p-2">

                            {items.map((item) => (
                                <RadixSelect.Item
                                    key={getValue(item)}
                                    value={getValue(item)}
                                    className="glass-select-item"
                                >

                                    <RadixSelect.ItemIndicator className="glass-select-item-indicator">
                                        <Check size={16} />
                                    </RadixSelect.ItemIndicator>

                                    <RadixSelect.ItemText>
                                        {getLabel(item)}
                                    </RadixSelect.ItemText>

                                </RadixSelect.Item>
                            ))}

                        </RadixSelect.Viewport>

                        <RadixSelect.ScrollDownButton className="glass-select-scroll-btn">
                            <ChevronDown size={16} />
                        </RadixSelect.ScrollDownButton>

                    </RadixSelect.Content>

                </RadixSelect.Portal>

            </RadixSelect.Root>

            {error && (
                <Typography variant="caption" color="danger">
                    {error}
                </Typography>
            )}

        </div>
    );
}