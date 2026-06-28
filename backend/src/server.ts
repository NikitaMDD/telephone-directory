import app from "./app.js";
import { env } from "./config/env.js";

async function bootstrap() {
    app.listen(env.port, () => {
        console.log(
            `Server started on http://localhost:${env.port}`
        );
    });
}

bootstrap();