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
const r = await pool.query(
    String.raw`
WITH users AS (
    (
        SELECT
            library_user_id
            , 'active' AS status
            , name
            , email
            , activated_time
            , NULL AS inactivated_time
        FROM library_user_active_st
    )
    UNION ALL
    (
        SELECT
            library_user_id
            , 'inactive' AS status
            , name
            , email
            , activated_time
            , inactivated_time
        FROM library_user_inactive_st
    )
)
SELECT
    'LUI' || TO_CHAR(library_user_id, 'FM00000') AS id
    , name
    , email
    , activated_time
    , inactivated_time
FROM users
ORDER BY id ASC;
;
        `,
);
for (const row of r.rows) {
    console.log("Postgres query result: ", row.id);
    console.log("Postgres query result: ", row.status);
    console.log("Postgres query result: ", row.name);
    console.log("Postgres query result: ", row.email);
    console.log("Postgres query result: ", row.activated_time);
    console.log("Postgres query result: ", row.inactivated_time);
}

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
