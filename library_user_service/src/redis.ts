import logger from "@src/logger";
import { createClient } from "redis";

const HOST = "redis";
const PORT = 6379;
const DB_NUMBER = 1;

const redisClient = createClient({
    url: `redis://${HOST}:${PORT}/${DB_NUMBER}`, // redis[s]://[[username][:password]@][host][:port][/db-number]
});

redisClient.on("error", (error) => {
    logger.error(`Redis client error: ${error}`);
});

await redisClient.connect();
logger.info("Redis client connected!");

export { redisClient };
