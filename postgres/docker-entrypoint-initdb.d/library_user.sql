CREATE DATABASE library_user_service;

\c library_user_service;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO users (username, password) VALUES
    ('admin', 'admin'),
    ('user', 'user');

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    year INT NOT NULL
);