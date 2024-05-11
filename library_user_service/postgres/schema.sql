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