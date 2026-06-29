import * as RadixSelect from "@radix-ui/react-select";

import {
    Check,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/cn";

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
    return (
        <div className="space-y-2">

            {label && (
                <Typography
                    variant="label"
                    weight="medium"
                >
                    {label}
                </Typography>
            )}

            <RadixSelect.Root
                value={value}
                disabled={disabled}
                onValueChange={onValueChange}
            >

                <RadixSelect.Trigger
                    className={cn(
                        "flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 outline-none transition",

                        error
                            ? "border-danger"
                            : "border-border hover:border-primary"
                    )}
                >

                    <RadixSelect.Value
                        placeholder={placeholder}
                    />

                    <RadixSelect.Icon>

                        <ChevronDown
                            size={18}
                        />

                    </RadixSelect.Icon>

                </RadixSelect.Trigger>

                <RadixSelect.Portal>

                    <RadixSelect.Content
                        position="popper"
                        className="z-50 overflow-hidden rounded-xl border bg-white shadow-xl"
                    >

                        <RadixSelect.ScrollUpButton
                            className="flex justify-center py-1"
                        >
                            <ChevronUp
                                size={16}
                            />
                        </RadixSelect.ScrollUpButton>

                        <RadixSelect.Viewport className="p-2">

                            {items.map(
                                (item) => (
                                    <RadixSelect.Item
                                        key={getValue(
                                            item
                                        )}
                                        value={getValue(
                                            item
                                        )}
                                        className="relative flex cursor-pointer items-center rounded-lg py-2 pl-8 pr-3 outline-none hover:bg-surface data-[state=checked]:bg-primary/10"
                                    >

                                        <RadixSelect.ItemIndicator
                                            className="absolute left-2"
                                        >
                                            <Check
                                                size={
                                                    16
                                                }
                                            />
                                        </RadixSelect.ItemIndicator>

                                        <RadixSelect.ItemText>

                                            {getLabel(
                                                item
                                            )}

                                        </RadixSelect.ItemText>

                                    </RadixSelect.Item>
                                )
                            )}

                        </RadixSelect.Viewport>

                    </RadixSelect.Content>

                </RadixSelect.Portal>

            </RadixSelect.Root>

            {error && (
                <Typography
                    variant="caption"
                    color="danger"
                >
                    {error}
                </Typography>
            )}

        </div>
    );
}