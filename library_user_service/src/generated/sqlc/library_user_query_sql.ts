import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const selectUserByIdQuery = `-- name: SelectUserById :one
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

export interface SelectUserByIdArgs {
    substring: string;
}

export interface SelectUserByIdRow {
    libraryUserId: string;
    status: string;
    name: string;
    email: string | null;
    activatedTime: Date;
    inactivatedTime: Date | null;
}

export async function selectUserById(client: Client, args: SelectUserByIdArgs): Promise<SelectUserByIdRow | null> {
    const result = await client.query({
        text: selectUserByIdQuery,
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

export const selectUsersQuery = `-- name: SelectUsers :many
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

export async function selectUsers(client: Client): Promise<SelectUserByIdRow[]> {
    const result = await client.query({
        text: selectUsersQuery,
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

export const insertUserActiveEventQuery = `-- name: InsertUserActiveEvent :exec
INSERT INTO library_user_active_ev (
    library_user_id
    , name
    , email
    , activated_time
    , event_time
) VALUES (
    CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
    , $2
    , $3
    , $4
    , $5
)`;

export interface InsertUserActiveEventArgs {
    substring: string;
    name: string;
    email: string | null;
    activatedTime: Date;
    eventTime: Date;
}

export async function insertUserActiveEvent(client: Client, args: InsertUserActiveEventArgs): Promise<void> {
    await client.query({
        text: insertUserActiveEventQuery,
        values: [args.substring, args.name, args.email, args.activatedTime, args.eventTime],
        rowMode: "array"
    });
}

export const insertUserInactiveEventQuery = `-- name: InsertUserInactiveEvent :exec
INSERT INTO library_user_inactive_ev (
    library_user_id
    , inactivated_time
    , event_time
) VALUES (
    CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
    , $2
    , $3
)`;

export interface InsertUserInactiveEventArgs {
    substring: string;
    inactivatedTime: Date;
    eventTime: Date;
}

export async function insertUserInactiveEvent(client: Client, args: InsertUserInactiveEventArgs): Promise<void> {
    await client.query({
        text: insertUserInactiveEventQuery,
        values: [args.substring, args.inactivatedTime, args.eventTime],
        rowMode: "array"
    });
}

export const insertUserActiveStateQuery = `-- name: InsertUserActiveState :one
INSERT INTO library_user_active_st (
    library_user_id
    , name
    , email
    , activated_time
) VALUES (
    CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
    , $2
    , $3
    , $4
)
RETURNING
    'LUI' || TO_CHAR(library_user_id, 'FM00000') AS library_user_id
    , 'active' AS status
    , name
    , email
    , activated_time
    , NULL AS inactivated_time`;

export interface InsertUserActiveStateArgs {
    substring: string;
    name: string;
    email: string | null;
    activatedTime: Date;
}

export async function insertUserActiveState(client: Client, args: InsertUserActiveStateArgs): Promise<SelectUserByIdRow | null> {
    const result = await client.query({
        text: insertUserActiveStateQuery,
        values: [args.substring, args.name, args.email, args.activatedTime],
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

export const deleteUserActiveStateQuery = `-- name: DeleteUserActiveState :exec
DELETE FROM library_user_active_st
WHERE library_user_id = CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)`;

export interface DeleteUserActiveStateArgs {
    substring: string;
}

export async function deleteUserActiveState(client: Client, args: DeleteUserActiveStateArgs): Promise<void> {
    await client.query({
        text: deleteUserActiveStateQuery,
        values: [args.substring],
        rowMode: "array"
    });
}

export const insertUserInactiveStateQuery = `-- name: InsertUserInactiveState :one
INSERT INTO library_user_inactive_st (
    library_user_id
    , name
    , email
    , activated_time
    , inactivated_time
) VALUES (
    CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
    , $2
    , $3
    , $4
    , $5
)
RETURNING
    'LUI' || TO_CHAR(library_user_id, 'FM00000') AS library_user_id
    , 'inactive' AS status
    , name
    , email
    , activated_time
    , inactivated_time`;

export interface InsertUserInactiveStateArgs {
    substring: string;
    name: string;
    email: string | null;
    activatedTime: Date;
    inactivatedTime: Date;
}

export async function insertUserInactiveState(client: Client, args: InsertUserInactiveStateArgs): Promise<SelectUserByIdRow | null> {
    const result = await client.query({
        text: insertUserInactiveStateQuery,
        values: [args.substring, args.name, args.email, args.activatedTime, args.inactivatedTime],
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
