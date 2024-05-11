-- name: SelectUserById :one
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
WHERE library_user_id = CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
;

-- name: SelectUsers :many
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
ORDER BY library_user_id ASC;
;

-- name: InsertUserActiveEvent :exec
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
);

-- name: InsertUserInactiveEvent :exec
INSERT INTO library_user_inactive_ev (
    library_user_id
    , inactivated_time
    , event_time
) VALUES (
    CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER)
    , $2
    , $3
);

-- name: InsertUserActiveState :one
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
    , NULL AS inactivated_time
;

-- name: DeleteUserActiveState :exec
DELETE FROM library_user_active_st
WHERE library_user_id = CAST(SUBSTRING($1 FROM 'LUI([0-9]{5})') AS INTEGER);

-- name: InsertUserInactiveState :one
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
    , inactivated_time
;