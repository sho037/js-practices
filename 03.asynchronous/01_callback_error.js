import sqlite3 from "sqlite3";

import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

const db = new sqlite3.Database(":memory:");

const BOOK = {
  title:
    "プロを目指す人のためのRuby入門[改訂2版] 言語仕様からテスト駆動開発・デバッグ技法まで (Software Design plus) ",
};

db.run(CREATE_BOOKS_TABLE_QUERY, () => {
  db.run(ERROR_INSERT_BOOK_QUERY, [BOOK.title], (err) => {
    console.log(err);
    db.run(ERROR_SELECT_BOOK_QUERY, ["non_existent_id"], (err) => {
      console.log(err);
      db.run(DROP_BOOKS_TABLE_QUERY);
    });
  });
});
