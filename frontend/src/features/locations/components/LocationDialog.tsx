import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";

import { LocationForm } from "../forms/LocationForm";

import type { Location } from "../types";

interface Props {
    open: boolean;
    location?: Location;
    onClose(): void;
}

export function LocationDialog({
    open,
    location,
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
                    location
                        ? "Редактирование корпуса"
                        : "Добавление корпуса"
                }
                description={
                    location
                        ? "Измените информацию о корпусе."
                        : "Заполните информацию о новом корпусе."
                }
            />

            <Dialog.Content>
                <LocationForm
                    id="location-form"
                    location={location}
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
                    form="location-form"
                >
                    {location
                        ? "Сохранить"
                        : "Создать"}
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}