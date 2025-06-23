import sqlite3 from "sqlite3";

import {
  CREATE_BOOKS_TABLE_QUERY,
  INSERT_BOOK_QUERY,
  SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise.js";

const BOOK = {
  title:
    "体系的に学ぶ 安全なWebアプリケーションの作り方 第2版 脆弱性が生まれる原理と対策の実践",
};

const db = new sqlite3.Database(":memory:");

runSQL(db, CREATE_BOOKS_TABLE_QUERY)
  .then(() => {
    return runSQL(db, INSERT_BOOK_QUERY, BOOK.title);
  })
  .then((result) => {
    console.log(`Increment ID: ${result.lastID}`);
    return getSQL(db, SELECT_BOOK_QUERY, result.lastID);
  })
  .then((row) => {
    console.log(`Select Record: ${JSON.stringify(row)}`);
    runSQL(db, DROP_BOOKS_TABLE_QUERY);
  });
