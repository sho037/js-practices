import sqlite3 from "sqlite3";

import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise.js";

const BOOK = {
  title: "ゼロからわかるRuby超入門",
};

const db = new sqlite3.Database(":memory:");

runSQL(db, CREATE_BOOKS_TABLE_QUERY).then(() => {
  runSQL(db, ERROR_INSERT_BOOK_QUERY, BOOK.title)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      getSQL(db, ERROR_SELECT_BOOK_QUERY, "non_existent_id")
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          runSQL(db, DROP_BOOKS_TABLE_QUERY);
        });
    });
});
