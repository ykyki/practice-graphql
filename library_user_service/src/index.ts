import { type Plugin, createSchema, createYoga } from "graphql-yoga";
import logger from "@src/logger";
import queryResolvers from "@src/queryResolvers";
import mutationResolvers from "@src/mutationResolvers";

const useLogger: Plugin = {
    onRequest: ({ request }) => {
        logger.info(`Request: ${request.method} ${request.url}`);
    },
};

const typeDefs = [
    await Bun.file("./graphql/type.graphql").text(),
    await Bun.file("./graphql/query.graphql").text(),
    await Bun.file("./graphql/mutation.graphql").text(),
];
const resolvers = {
    Query: {
        ...queryResolvers,
    },
    Mutation: {
        ...mutationResolvers,
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
