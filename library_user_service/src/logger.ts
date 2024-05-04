import bunyan from "bunyan";

const logger = bunyan.createLogger({ name: "_" });
logger.addSerializers({ req: (req) => ({ method: req.method, url: req.url }) });
logger.info("logger initialized");

export default logger;
