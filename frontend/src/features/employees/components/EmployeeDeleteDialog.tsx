import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";
import { Typography } from "@/shared/ui/Typography";

import { useDeleteEmployee } from "../hooks/useEmployees";

import type { Employee } from "../types";

interface Props {
    open: boolean;
    employee?: Employee;
    onClose(): void;
}

export function EmployeeDeleteDialog({
    open,
    employee,
    onClose,
}: Props) {
    const deleteMutation =
        useDeleteEmployee();

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (open) {
            setError("");
        }
    }, [open]);

    function handleDelete() {
        if (!employee) {
            return;
        }

        if (deleteMutation.isPending) {
            return;
        }

        deleteMutation.mutate(
            employee.id,
            {
                onSuccess: () => {
                    onClose();
                },

                onError: (error: any) => {
                    const serverMessage =
                        error?.response?.data?.message ||
                        error?.message;

                    setError(
                        typeof serverMessage === "string"
                            ? serverMessage
                            : "Не удалось удалить сотрудника. Попробуйте еще раз."
                    );
                },
            }
        );
    }

    const employeeFullName = employee
        ? `${employee.lastName} ${employee.firstName}${
              employee.middleName ? ` ${employee.middleName}` : ""
          }`
        : "";

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
                title="Удаление сотрудника"
                description="Это действие нельзя отменить."
            />

            <Dialog.Content>
                <div className="space-y-3">
                    <Typography>
                        Удалить сотрудника "{employeeFullName}"?
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
                        !employee ||
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