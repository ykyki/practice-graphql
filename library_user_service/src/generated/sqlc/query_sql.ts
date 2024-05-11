import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const libraryUserRepositoryDb_findByIdQuery = `-- name: LibraryUserRepositoryDb_findById :one
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
    'LUI' || TO_CHAR(library_user_id, 'FM00000') AS library_user_id
    , status
    , name
    , email
    , activated_time
    , inactivated_time
FROM users
WHERE library_user_id = CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)`;

export interface LibraryUserRepositoryDb_findByIdArgs {
    substring: string;
}

export interface LibraryUserRepositoryDb_findByIdRow {
    libraryUserId: string | null;
    status: string;
    name: string;
    email: string | null;
    activatedTime: Date;
    inactivatedTime: string | null;
}

export async function libraryUserRepositoryDb_findById(client: Client, args: LibraryUserRepositoryDb_findByIdArgs): Promise<LibraryUserRepositoryDb_findByIdRow | null> {
    const result = await client.query({
        text: libraryUserRepositoryDb_findByIdQuery,
        values: [args.substring],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        libraryUserId: row[0],
        status: row[1],
        name: row[2],
        email: row[3],
        activatedTime: row[4],
        inactivatedTime: row[5]
    };
}

export const libraryUserRepositoryDb_findByAllQuery = `-- name: LibraryUserRepositoryDb_findByAll :many
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
    'LUI' || TO_CHAR(library_user_id, 'FM00000') AS library_user_id
    , status
    , name
    , email
    , activated_time
    , inactivated_time
FROM users
ORDER BY library_user_id ASC`;

export interface LibraryUserRepositoryDb_findByAllRow {
    libraryUserId: string | null;
    status: string;
    name: string;
    email: string | null;
    activatedTime: Date;
    inactivatedTime: string | null;
}

export async function libraryUserRepositoryDb_findByAll(client: Client): Promise<LibraryUserRepositoryDb_findByAllRow[]> {
    const result = await client.query({
        text: libraryUserRepositoryDb_findByAllQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            libraryUserId: row[0],
            status: row[1],
            name: row[2],
            email: row[3],
            activatedTime: row[4],
            inactivatedTime: row[5]
        };
    });
}

