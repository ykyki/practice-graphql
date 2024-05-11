CREATE DATABASE library_user_service;

\c library_user_service;

CREATE TABLE library_user_active_ev (
    library_user_id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    activated_time TIMESTAMPTZ NOT NULL,
    event_time TIMESTAMPTZ NOT NULL,
    CONSTRAINT valid_id CHECK (library_user_id > 0)
);
CREATE TABLE library_user_inactive_ev (
    library_user_id INTEGER PRIMARY KEY,
    inactivated_time TIMESTAMPTZ NOT NULL,
    event_time TIMESTAMPTZ NOT NULL,
    CONSTRAINT valid_id CHECK (library_user_id > 0)
);
CREATE TABLE library_user_active_st (
    library_user_id INTEGER PRIMARY KEY REFERENCES library_user_active_ev,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    activated_time TIMESTAMPTZ NOT NULL,
    CONSTRAINT valid_id CHECK (library_user_id > 0)
);
CREATE TABLE library_user_inactive_st (
    library_user_id INTEGER PRIMARY KEY REFERENCES library_user_inactive_ev,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    activated_time TIMESTAMPTZ NOT NULL,
    inactivated_time TIMESTAMPTZ NOT NULL,
    CONSTRAINT valid_id CHECK (library_user_id > 0)
);

INSERT INTO library_user_active_ev
(library_user_id, name, email, activated_time, event_time)
VALUES
(1, 'Alice', NULL, NOW(), NOW() ),
(2, '山田太郎', 'abc@example.com', '2024-05-11 18:36:00+09', NOW()),
(3, 'Bob', NULL, '2024-01-01 12:00 JST', NOW()),
(4, 'Charlie', NULL, '2024-02-02 12:00 JST', NOW()),
(5, 'David', NULL, '2024-03-03 12:00 JST', NOW())
;
INSERT INTO library_user_inactive_ev
(library_user_id, inactivated_time, event_time)
VALUES
(3, '2024-01-02 12:00 JST', NOW()),
(4, '2024-02-03 12:00 JST', NOW())
;
INSERT INTO library_user_active_st
(library_user_id, name, email, activated_time)
VALUES
(1, 'Alice', NULL, NOW()),
(2, '山田太郎', 'abc@example.com', '2024-05-11 18:36:00+09'),
(5, 'David', NULL, '2024-03-03 12:00 JST')
;
INSERT INTO library_user_inactive_st
(library_user_id, name, email, activated_time, inactivated_time)
VALUES
(3, 'Bob', NULL, '2024-01-01 12:00 JST', '2024-01-02 12:00 JST'),
(4, 'Charlie', NULL, '2024-02-02 12:00 JST', '2024-02-03 12:00 JST')
;
