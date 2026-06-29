import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";

import { DepartmentForm } from "../forms/DepartmentForm";

import type { Department } from "../types";

interface Props {
    open: boolean;
    department?: Department;
    onClose(): void;
}

export function DepartmentDialog({
    open,
    department,
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
                    department
                        ? "Редактирование подразделения"
                        : "Добавление подразделения"
                }
                description={
                    department
                        ? "Измените информацию о подразделении."
                        : "Заполните информацию о новом подразделении."
                }
            />

            <Dialog.Content>
                <DepartmentForm
                    id="department-form"
                    department={department}
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
                    form="department-form"
                >
                    {department
                        ? "Сохранить"
                        : "Создать"}
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}