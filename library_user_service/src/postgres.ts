import { Pool } from "pg";

export const initPostgres = (): Pool => {
    // const pool = new Pool({
    //     user: process.env.POSTGRES_USER,
    //     host: process.env.POSTGRES_HOST,
    //     database: process.env.POSTGRES_DB,
    //     password: process.env.POSTGRES_PASSWORD,
    //     port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
    // });
    const pool = new Pool({
        user: "posadmin",
        host: "postgres",
        database: "library_user_service",
        password: "pospass",
        port: 5432,
        connectionTimeoutMillis: 1000,
        idleTimeoutMillis: 1000,
        max: 10,
    });

    return pool;
};
