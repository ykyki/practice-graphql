import bunyan from "bunyan";

const logger = bunyan.createLogger({ name: "_"  });
logger.addSerializers({req: (req) => ({method: req.method, url: req.url})});
logger.info("Bun server starting...");

Bun.serve({
    port: 3000,
    fetch(req) {
        logger.info({req}, "Request received")
        return new Response(`Bun!! ${new Date().getTime()}`);
    }
});