export const CREATE_BOOKS_TABLE_QUERY =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

export const INSERT_BOOK_QUERY = "INSERT INTO books (title) VALUES (?)";

export const SELECT_BOOK_QUERY = "SELECT * FROM books WHERE id = (?)";

export const DROP_BOOKS_TABLE_QUERY = "DROP TABLE books";

export const ERROR_INSERT_BOOK_QUERY =
  "INSERT INTO books (not_exist_column) VALUES (?)";

export const ERROR_SELECT_BOOK_QUERY =
  "SELECT * FROM not_exist_table WHERE id = (?)";
