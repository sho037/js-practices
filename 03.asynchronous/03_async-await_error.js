import sqlite3 from "sqlite3";

import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise-sql.js";

const BOOK = {
  title: "たった1日で基本が身に付く!Go言語超入門",
};

const db = new sqlite3.Database(":memory:");

await runSQL(db, CREATE_BOOKS_TABLE_QUERY);
try {
  await runSQL(db, ERROR_INSERT_BOOK_QUERY, BOOK.title);
} catch (err) {
  if (err.code === "SQLITE_ERRORa") {
    console.log(err);
  } else {
    throw err;
  }
}
try {
  await getSQL(db, ERROR_SELECT_BOOK_QUERY, "non_existent_id");
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.log(err);
  } else {
    throw err;
  }
}
await runSQL(db, DROP_BOOKS_TABLE_QUERY);
