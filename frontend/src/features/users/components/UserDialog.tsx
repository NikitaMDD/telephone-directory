import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";

import { UserForm } from "../forms/UserForm";

import type { User } from "../types";

interface Props {
    open: boolean;
    user?: User;
    onClose(): void;
}

export function UserDialog({
    open,
    user,
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
                    user
                        ? "Редактирование пользователя"
                        : "Добавление пользователя"
                }
                description={
                    user
                        ? "Измените информацию о пользователе."
                        : "Заполните информацию о новом пользователе."
                }
            />

            <Dialog.Content>
                <UserForm
                    id="user-form"
                    user={user}
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
                    form="user-form"
                >
                    {user
                        ? "Сохранить"
                        : "Создать"}
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}