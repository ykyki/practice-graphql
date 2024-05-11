import logger from "@src/logger";
import { initPostgres } from "@src/postgres";
import { redisClient } from "@src/redis";
import mutationResolvers from "@src/resolver/mutationResolvers";
import queryResolvers from "@src/resolver/queryResolvers";
import scalarResolvers from "@src/resolver/scalarResolvers";
import { type Plugin, createSchema, createYoga } from "graphql-yoga";
import { LibraryUserStatus } from "./domain/library/user/LibraryUserStatus";
import type { Resolvers } from "./generated/server";

const pool = initPostgres();
const r = await pool.query("SELECT id, username FROM users ORDER BY id DESC");
console.log("Postgres query result: ", r.rows[0].id);
console.log("Postgres query result: ", r.rows[0].username);
console.log("Postgres query result: ", r.rows[1].id);
console.log("Postgres query result: ", r.rows[1].username);

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
    LibraryUser: {
        __resolveType: (obj) => {
            if (obj.status === LibraryUserStatus.ACTIVE.toApiValue()) {
                return "LibraryUserActive";
            }
            if (obj.status === LibraryUserStatus.INACTIVE.toApiValue()) {
                return "LibraryUserInactive";
            }
            return null;
        },
    },
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
