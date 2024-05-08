import logger from "@src/logger";
import { redisClient } from "@src/redis";
import mutationResolvers from "@src/resolver/mutationResolvers";
import queryResolvers from "@src/resolver/queryResolvers";
import scalarResolvers from "@src/resolver/scalarResolvers";
import { type Plugin, createSchema, createYoga } from "graphql-yoga";
import type { Resolvers } from "./generated/server";

await redisClient.set("key", "value");

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
    ...scalarResolvers,
} satisfies Resolvers;

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
