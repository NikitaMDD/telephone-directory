import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";
import { Typography } from "@/shared/ui/Typography";

import { useDeleteLocation } from "../hooks/useLocations";

import type { Location } from "../types";

interface Props {
    open: boolean;
    location?: Location;
    onClose(): void;
}

export function LocationDeleteDialog({
    open,
    location,
    onClose,
}: Props) {
    const deleteMutation =
        useDeleteLocation();

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (open) {
            setError("");
        }
    }, [open]);

    function handleDelete() {
        if (!location) {
            return;
        }

        if (deleteMutation.isPending) {
            return;
        }

        deleteMutation.mutate(
            location.id,
            {
                onSuccess: () => {
                    onClose();
                },

                onError: () => {
                    setError(
                        "Не удалось удалить корпус. Попробуйте еще раз."
                    );
                },
            }
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (
                    !value &&
                    !deleteMutation.isPending
                ) {
                    onClose();
                }
            }}
        >
            <Dialog.Header
                title="Удаление корпуса"
                description="Это действие нельзя отменить."
            />

            <Dialog.Content>
                <div className="space-y-3">
                    <Typography>
                        Удалить корпус "
                        {location?.name}
                        "?
                    </Typography>

                    {error ? (
                        <Typography color="danger">
                            {error}
                        </Typography>
                    ) : null}
                </div>
            </Dialog.Content>

            <Dialog.Footer>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={
                        deleteMutation.isPending
                    }
                >
                    Отмена
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    onClick={handleDelete}
                    disabled={
                        !location ||
                        deleteMutation.isPending
                    }
                >
                    {deleteMutation.isPending
                        ? "Удаление..."
                        : "Удалить"}
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}