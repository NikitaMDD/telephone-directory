import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";

import { EmployeeForm } from "../forms/EmployeeForm";

import type { Employee } from "../types";

interface Props {
    open: boolean;
    employee?: Employee;
    onClose(): void;
}

export function EmployeeDialog({
    open,
    employee,
    onClose,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    onClose();
                }
            }}
        >
            <Dialog.Header
                title={
                    employee
                        ? "Редактирование сотрудника"
                        : "Добавление сотрудника"
                }
                description={
                    employee
                        ? "Измените информацию о сотруднике."
                        : "Заполните информацию о новом сотруднике."
                }
            />

            <Dialog.Content>
                <EmployeeForm
                    id="employee-form"
                    employee={employee}
                    onSuccess={onClose}
                />
            </Dialog.Content>

            <Dialog.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Отмена
                </Button>

                <Button
                    type="submit"
                    form="employee-form"
                >
                    {employee
                        ? "Сохранить"
                        : "Создать"}
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}