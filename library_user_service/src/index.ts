import { type Plugin, createSchema, createYoga } from "graphql-yoga";
import logger from "./logger";

const useLogger: Plugin = {
    onRequest: ({ request }) => {
        logger.info(`Request: ${request.method} ${request.url}`);
    },
};

const typeDefs = `#graphql
    type Query {
        greetings: String!
    }
`;
const resolvers = {
    Query: {
        greetings: () => "Hello, yoga!",
    },
};
const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers,
    }),
    healthCheckEndpoint: "/health",
    plugins: [useLogger],
});

logger.info("Starting server...");

Bun.serve({
    port: 3000,
    fetch: yoga,
});

logger.info("Server started!");
