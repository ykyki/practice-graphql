-- name: LibraryUserRepositoryDb_findById :one
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

-- name: LibraryUserRepositoryDb_findByAll :many
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