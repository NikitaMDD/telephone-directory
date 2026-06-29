import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Typography } from "@/shared/ui/Typography";

import { exportApi } from "@/features/export/api/export.api";

import { downloadFile } from "@/shared/lib/downloadFile";

export function ExportPage() {
    async function handlePdf() {
        const blob =
            await exportApi.exportPdf();

        downloadFile(blob, "directory.pdf");
    }

    async function handleDocx() {
        const blob =
            await exportApi.exportDocx();

        downloadFile(blob, "directory.docx");
    }

    return (
        <div className="space-y-8 p-8">

            {/* HEADER */}
            <div>
                <Typography
                    variant="h1"
                    weight="bold"
                >
                    Экспорт справочника
                </Typography>

                <Typography color="secondary">
                    Формирование печатной версии
                    телефонного справочника
                </Typography>
            </div>

            {/* MAIN EXPORT */}
            <div className="grid gap-6 md:grid-cols-2">

                <Card className="p-6 space-y-4">

                    <Typography
                        variant="h2"
                        weight="bold"
                    >
                        PDF версия
                    </Typography>

                    <Typography
                        color="secondary"
                    >
                        Полный справочник в
                        формате для печати
                    </Typography>

                    <Button
                        onClick={handlePdf}
                        fullWidth
                    >
                        Скачать PDF
                    </Button>

                </Card>

                <Card className="p-6 space-y-4">

                    <Typography
                        variant="h2"
                        weight="bold"
                    >
                        DOCX версия
                    </Typography>

                    <Typography
                        color="secondary"
                    >
                        Для редактирования в Word
                    </Typography>

                    <Button
                        onClick={handleDocx}
                        fullWidth
                    >
                        Скачать DOCX
                    </Button>

                </Card>

            </div>

            {/* INFO BLOCK */}
            <Card className="p-6">

                <Typography
                    variant="h2"
                    weight="bold"
                >
                    Структура экспорта
                </Typography>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">

                    <li>• Ректорат (всегда первый)</li>
                    <li>• Департаменты</li>
                    <li>• Административные управления</li>
                    <li>• Институты</li>
                    <li>• Факультеты</li>
                    <li>• Кафедры</li>
                    <li>• Общественные организации</li>
                    <li>• Охрана корпусов</li>

                </ul>

            </Card>

        </div>
    );
}