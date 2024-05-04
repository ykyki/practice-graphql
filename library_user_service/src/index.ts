import logger from "./logger";
import { route as routeHealth } from "./route/health";

Bun.serve({
    port: 3000,
    fetch(req) {
        logger.info({ req }, "Request received");

        const url = new URL(req.url);

        if (url.pathname === "/health") {
            return routeHealth();
        }

        return new Response(`Not Found (${url.pathname})`, {
            status: 404,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    },
});
