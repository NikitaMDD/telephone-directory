import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
            <Typography
                variant="display"
                weight="bold"
            >
                Упс...
            </Typography>

            <Typography
                variant="h2"
                align="center"
            >
                Страница не найдена!
            </Typography>

            <Typography
                variant="body"
                color="secondary"
                align="center"
                className="max-w-md"
            >
                Возможно, ссылка устарела или страница была
                перемещена.
            </Typography>

            <Link to="/">
                <Button size="lg">
                    Вернуться на главную
                </Button>
            </Link>
        </div>
    );
}