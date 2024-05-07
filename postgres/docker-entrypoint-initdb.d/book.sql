CREATE DATABASE book_service;

\c book_service;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    year INT NOT NULL
);

INSERT INTO books (title, author, year) VALUES
    ('The Catcher in the Rye', 'J.D. Salinger', 1951),
    ('To Kill a Mockingbird', 'Harper Lee', 1960),
    ('1984', 'George Orwell', 1949),
    ('Pride and Prejudice', 'Jane Austen', 1813),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    ('The Grapes of Wrath', 'John Steinbeck', 1939);