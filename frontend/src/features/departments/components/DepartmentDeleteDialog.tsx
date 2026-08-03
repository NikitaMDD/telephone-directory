import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";
import { Typography } from "@/shared/ui/Typography";

import { useDeleteDepartment } from "../hooks/useDepartments";

import type { Department } from "../types";

interface Props {
    open: boolean;
    department?: Department;
    onClose(): void;
}

export function DepartmentDeleteDialog({
    open,
    department,
    onClose,
}: Props) {
    const deleteMutation =
        useDeleteDepartment();

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (open) {
            setError("");
        }
    }, [open]);

    function handleDelete() {
        if (!department) {
            return;
        }

        if (deleteMutation.isPending) {
            return;
        }

        deleteMutation.mutate(
            department.id,
            {
                onSuccess: () => {
                    onClose();
                },

                onError: (error: any) => {
                    // Достаем сообщение об ошибке из ответа сервера
                    const serverMessage =
                        error?.response?.data?.message ||
                        error?.message;

                    setError(
                        typeof serverMessage === "string"
                            ? serverMessage
                            : "Не удалось удалить подразделение. Попробуйте еще раз."
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
                title="Удаление подразделения"
                description="Это действие нельзя отменить."
            />

            <Dialog.Content>
                <div className="space-y-3">
                    <Typography>
                        Удалить подразделение "
                        {department?.name}
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
                        !department ||
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